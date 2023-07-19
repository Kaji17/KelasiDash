import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // ********USSD*********//
  /**
   * Recuperer la liste des transaction par Airtime
   * @param obj
   * @returns Observable<any>
   * @author kaji17
   */
  public getAlltransactionAirtime(obj: any): Observable<any> {
    return this.http.get<any>(
      this.configService.getApi('ALL_TRANS_AIRTIME_GET'),
      {
        params: obj,
      }
    );
  }

  // ********MOMO*********//
  /**
   * Recuperer la liste des transaction par MoMo
   * @param obj
   * @returns Observable<any>
   * @author kaji17
   */
  public getAlltransactionMoMo(obj: any): Observable<any> {
    return this.http.get<any>(this.configService.getApi('ALL_TRANS_MOMO_GET'), {
      params: obj,
    });
  }
}
