import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root',
})
export class StatistiqueService {
  constructor(private http: HttpClient, private configService: Configurable) {}

  // ********USSD*********//
  /**
   * Recuperer le nombre total de toute les transactions
   * @param obj
   * @returns Observable<number>
   * @author kaji17
   */
  public getTransactionTotal(obj?: any): Observable<number> {
    return this.http.get<number>(
      this.configService.getApi('STAT_AIRTIME_COUNT_GET'),
      {
        params: obj,
      }
    );
  }

  /**
   *  Recuperer les montant total des transaction en foction du status et intervalle de temps
   * @param obj
   * @returns Observable<number>
   * @author kaji17
   */
  public getMontantTotal(obj: any): Observable<number> {
    return this.http.get<number>(
      this.configService.getApi('STAT_AIRTIME_MONTANT_GET'),
      {
        params: obj,
      }
    );
  }

  /**
   *  Recuperer la liste des differens status de transaction par Airtimes
   * @returns Observable<any[]>
   * @author kaji17
   */
  public getAllStatus(): Observable<any[]> {
    return this.http.get<any[]>(
      this.configService.getApi('STAT_AIRTIME_STATUS_GET')
    );
  }

  // ********MOMO*********//
  /**
   * Recuperer le nombre total de toute les transactions
   * @param obj
   * @returns Observable<number>
   * @author kaji17
   */
  public getTransactionTotalMomo(obj?: any): Observable<number> {
    return this.http.get<number>(
      this.configService.getApi('STAT_MOMO_COUNT_GET'),
      {
        params: obj,
      }
    );
  }

  /**
   * Recuperer les montant total des transaction en foction du status et intervalle de temps
   * @param obj
   * @returns Observable<number>
   * @author kaji17
   */
  public getMontantTotalMomo(obj: any): Observable<number> {
    return this.http.get<number>(
      this.configService.getApi('STAT_MOMO_MONTANT_GET'),
      {
        params: obj,
      }
    );
  }

  /**
   * Recuperer la liste des differens status de transaction par Airtimes
   * @returns Observable<any[]>
   * @author kaji17
   */
  // Recuperer la liste des differens status de transaction par Airtimes
  public getAllStatusMomo(): Observable<any[]> {
    return this.http.get<any[]>(
      this.configService.getApi('STAT_MOMO_STATUS_GET')
    );
  }

  // ********SMS*********//
  /**
   * Recuperer le nombre total des SMS
   * @param obj
   * @returns Observable<number>
   * @author kaji17
   */
  public getTauxSms(obj?: any): Observable<any> {
    return this.http.get<any>(
      this.configService.getApi('SMS_TAUX'),
      {
        params: obj,
      }
    );
  }
}
