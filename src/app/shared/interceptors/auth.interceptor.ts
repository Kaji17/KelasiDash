import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ChecktokenService } from './checktoken.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router, private chktoken: ChecktokenService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    // check if token still valid
    let keyLocalStorage: string = 'user_info';
    let firstRoutelabel = this.getFirstOfRoute();

    let take = localStorage.getItem(keyLocalStorage)
    let tokenOBJECT = JSON.parse(take as string);
    ;
    let token: string = tokenOBJECT ? tokenOBJECT.accessTokenResponse.access_token : null;
    let refreshToken: string = tokenOBJECT ? tokenOBJECT.accessTokenResponse.refresh_token : null;
    // console.log('==TOK',tokenOBJECT.accessTokenResponse)
    if (token) {
      console.log('==TOK')
      // SI le token doit etre raffriachi
      // console.log(
      //   ' token getTokenExpirationDate :::> ',
      //   ChecktokenService.getTokenExpirationDate(token)
      // );
      switch (ChecktokenService.getTokenExpirationDate(token)) {
        case 0:
          // On ne fait rien , on ajoute les autorisatiions actuelles a la requete et on l'envoi
          break;
        case 1:
          // On demande a raffraichir le token
          ;
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);
            ;

            return this.chktoken.extendToken(refreshToken).pipe(
              switchMap((authResponse) => {
                console.log('==authresponse',authResponse)
                localStorage.setItem(
                  keyLocalStorage,
                  JSON.stringify(authResponse)
                );
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(authResponse);
                return next.handle(
                  this.injectToken(req, authResponse.accessTokenResponse.access_token)
                );
              })
            );
          } else {
            ;
          }
          break;

        default:
          // On deconnecte l'user ou l'admin
          localStorage.removeItem(keyLocalStorage);
          this.router.navigate(['/']);
          break;
      }

      //  peut etre faire une verif de la current route ou
      req = this.injectToken(req, token);
    }

    return next.handle(req);
  }

  injectToken(request: HttpRequest<any>, token: string) {
    console.log('==inject token')
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getFirstOfRoute(): string {
    let elts = this.router.url.split('/');
    elts.shift();

    return elts[0];
  }
}
