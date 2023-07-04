import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // Login
  public login(obj: any) {
    return this.http.get(this.configService.getApi('ADMIN_AUTH_SIGNIN'),{
      params: obj,
      observe: 'response',
    });
  }

  // Refresh token
  public refreshToken(refreshtoken?: any) {
    return this.http.get(this.configService.getApi('ADMIN_AUTH_REFRESHTOKEN'), {
      observe: 'response',
      params: refreshtoken,
    });
  }
}
