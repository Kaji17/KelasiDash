import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configurable } from 'src/app/core/config';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private http: HttpClient, private configService: Configurable) { }

  // Recuperer le nombre total de toute les transactions
  public getTransactionTotal(obj?:any):Observable<number>{
    return this.http.get<number>(this.configService.getApi('STAT_AIRTIME_COUNT_GET'),{
      params:obj
    })
  }

  // Recuperer les montant total des transaction en foction du status et intervalle de temps
  public getMontantTotal(obj:any):Observable<number>{
    return this.http.get<number>(this.configService.getApi('STAT_AIRTIME_MONTANT_GET'),{
      params: obj
    })
  }

  // Recuperer la liste des differens status de transaction par Airtimes
  public getAllStatus():Observable<any[]>{
    return this.http.get<any[]>(this.configService.getApi('STAT_AIRTIME_STATUS_GET'))
  }

    // Recuperer le nombre total de toute les transactions
    public getTransactionTotalMomo(obj?:any){
      return this.http.get(this.configService.getApi('STAT_MOMO_COUNT_GET'),{
        params:obj
      })
    }
  
    // Recuperer les montant total des transaction en foction du status et intervalle de temps
    public getMontantTotalMomo(obj:any):Observable<number>{
      return this.http.get<number>(this.configService.getApi('STAT_MOMO_MONTANT_GET'),{
        params: obj
      })
    }
  
    // Recuperer la liste des differens status de transaction par Airtimes
    public getAllStatusMomo():Observable<any[]>{
      return this.http.get<any[]>(this.configService.getApi('STAT_MOMO_STATUS_GET'))
    }

}
