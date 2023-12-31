import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subscription
} from 'rxjs';
import { StatistiqueService } from 'src/app/shared/services/statistique.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any;
  tabDat: any = [];
  chartOptions: any;
  chiffreAffaire!: number;
  tottalTransaction: number;
  tottalTransactionAirt: number;
  tottalTransactionMoMo: number;
  tottalTransactionSuccess!: number;
  tottalTransactionEchec: number;
  TT!: number;
  totalEchec!: number;
  progressMomo!: number;
  progressUssd!: number;
  titleAppMobile!: string;
  titleUSSD!: string;
  CA: number;
  objChiffreaffaire: {};
  countCA: any;
  closable: boolean;
  dateDebut: Date;
  iconsverif: string = 'pi pi-check';
  percentAppmobilS: number;
  percentAppmobilE: number;
  percentUssdS: number;
  percentUssdE: number;

  // SUSCRIBE
  subscriptionATotalamount: Subscription;
  subscriptionCountAirStat: Subscription;
  subscriptionCountMoMoSta: Subscription;
  subscriptionSuccesA: Subscription;
  subscriptionSuccesM: Subscription;
  subscriptionCountSMS: Subscription;
  subscriptionTauxByDevice: Subscription;

  constructor(private statistiqueService: StatistiqueService) {}

  ngOnInit(): void {
    this.initDataLocalStorage();
    this.initValue();
    this.getChiffreAffaireAirtimeMoMo()
    this.getTotalTransaction();
    this.getTotalTransactionM();
    this.getTotalTransactionA();
    this.getTauxByCannal("appmobile");
    this.getTauxByCannal("ussd");
    this.getTabData();
  }

  ngOnDestroy(): void {
    // this.subscriptionATotalamount.unsubscribe();
    this.subscriptionCountMoMoSta.unsubscribe();
    this.subscriptionSuccesA.unsubscribe();
    this.subscriptionCountSMS.unsubscribe();
    this.subscriptionTauxByDevice.unsubscribe();
    }

  // Initialisation du localStorage
  initDataLocalStorage() {
    localStorage.setItem('tabData', JSON.stringify(this.tabDat));
    if (!localStorage.getItem('lastCAData')) {
      let obj = { 
        value: '',
        lastDate: '',
      };
      localStorage.setItem('lastCAData', JSON.stringify(obj));
    }
  }

// Initialisation des valeurs
  initValue() {
    this.objChiffreaffaire = {};
    this.tottalTransaction = 0;
    this.tottalTransactionSuccess = 0;
    this.tottalTransactionEchec = 0;
    this.tottalTransactionMoMo = 0;
    this.tottalTransactionAirt = 0;
    this.percentAppmobilS = 0;
    this.percentAppmobilE = 0;
    this.percentUssdS = 0;
    this.percentUssdE = 0;
    this.CA = 0;
    this.chiffreAffaire = 0;
    this.TT = 0;
    this.progressMomo = 70;
    this.progressUssd = 30;
    this.titleAppMobile = 'Résumé transaction App mobile';
    this.titleUSSD = 'Résumé transaction USSD';
    this.tabDat = [];
  }

  // Methode pour donner un effet de comptage
  countagge() {
    this.countCA = setInterval(() => {
      this.verify();
    }, 0.2);
  }

  // Fonction donnant un effet de compte au chiffre d'affaire
  verify() {
    if (this.chiffreAffaire !== 0 && this.CA < this.chiffreAffaire) {
      this.CA = this.CA + 1000;
      if (this.CA == this.chiffreAffaire) {
        clearInterval(this.countCA);
      }
    } else {
      this.CA = this.chiffreAffaire;
    }
  }

  // Recuperer le nombre total de toute les transactions
  getTotalTransaction() {
    let total1: number;
    this.subscriptionCountMoMoSta = this.statistiqueService
      .getTransactionTotalMomo()
      .subscribe({
        next: (total) => {
          total1 = total;

          this.statistiqueService
            .getTransactionTotal()
            .subscribe({
              next: (total) => {
                this.tottalTransaction = total + total1;
                console.log('Total__Trans_final:', this.tottalTransaction);
                this.getTotalTransactionSuccessEchec();
              },
            });
        },
      });
  }

  // Recuperer le nombre total des transaction par status
  getTotalTransactionStatus(obj: any): number {
    let valeur: number;
    this.statistiqueService.getTransactionTotal(obj).subscribe({
      next: (total) => {
        console.log(`Total__Trans_${obj.statut}:`, total);
        // this.tottalTransactionSuccess = total;
        valeur = total;
      },
    });
    return valeur;
  }

  // Recuperer le nombre total des transactions par reussit et échoué
  getTotalTransactionSuccessEchec() {
    let ca = {
      statut: 'Success',
    };

    let ca2 = {
      statut: 'SUCCESSFUL',
    };

    this.statistiqueService
      .getTransactionTotalMomo(ca2)
      .subscribe({
        next: (total) => {
          this.tottalTransactionSuccess = total;
          this.statistiqueService.getTransactionTotal(ca).subscribe({
            next: (total) => {
              this.tottalTransactionSuccess =
                this.tottalTransactionSuccess + total;
              console.log('TOTAL trans Succes:', this.tottalTransactionSuccess);

              // Recuperer les status échoués
              // this.getTotalTransaction()
              this.tottalTransactionEchec =
                this.tottalTransaction - this.tottalTransactionSuccess;
            },
          });
        },
      });

    console.log('TOTAL CHIFFRE AFFAIRE: ', this.tottalTransactionSuccess);
  }

  // Recuperer le nombre total de toute les transactions par MoMo
  getTotalTransactionM() {
    this.statistiqueService.getTransactionTotalMomo().subscribe({
      next: (value) => {
        console.log(`Transaction MoMo, ${value}`);
        this.tottalTransactionMoMo = value;
      },
    });
  }

  // Recuperer le nombre total de toute les transactions par USSD
  getTotalTransactionA() {
    this.statistiqueService.getTransactionTotal().subscribe({
      next: (value) => {
        console.log(`Transaction USSD, ${value}`);
        this.tottalTransactionAirt = value;
      },
    });
  }

  // Récuperation du chiffre d'affaire d'Airtimes et Momo des transactions réussits
  getChiffreAffaireAirtimeMoMo() {
    let ca = {
      statut: 'Success',
    };
    let ca1 = {
      statut: 'SUCCESSFUL',
    };
    let total1: number;
    this.subscriptionSuccesA = this.statistiqueService
      .getMontantTotal(ca)
      .subscribe({
        next: (value) => {
          total1 = value;
          console.log('montantTottal Airtime', this.chiffreAffaire);
          this.statistiqueService.getMontantTotalMomo(ca1).subscribe({
            next: (value) => {
              this.chiffreAffaire = total1 + value;
              console.log('montantTottal', this.chiffreAffaire);
            },
          });
        },
      });
  }

  // Recupération des données pour le diagramme circulaire
  getTabData() {
    let obj1 = {
      statut: 'UNDELIV',
    };
    let obj2 = {
      statut: 'EXPIRED',
    };
    let obj3 = {
      statut: 'DELIVRD',
    };
    this.subscriptionCountSMS = this.statistiqueService
      .getTauxSms(obj1)
      .subscribe({
        next: (value) => {
          // val1 = value.taux.toString();
          console.log('ledd  cjf;', this.formatTaux(value));
          this.tabDat.push(this.formatTaux(value));

          this.statistiqueService.getTauxSms(obj2).subscribe({
            next: (value) => {
              this.tabDat.push(this.formatTaux(value));
              this.statistiqueService.getTauxSms(obj3).subscribe({
                next: (value) => {
                  this.tabDat.push(this.formatTaux(value));
                  localStorage.setItem('tabData', JSON.stringify(this.tabDat));
                  console.log('tab lo:,', this.tabDat);
                  this.data = {
                    datasets: [
                      {
                        data: this.tabDat,
                        backgroundColor: ['#EE6060', '#eab308 ', '#39A74B'],
                        label: 'My dataset',
                      },
                    ],
                    labels: ['NON LIVRÉS', 'EXPIRÉ', 'LIVRÉ'],
                  };
                },
              });
            },
          });
        },
      });
  }

  // Recupération les taux d'echec et de succes a partir du canal de paiement AppMobile ou USSD
  getTauxByCannal(chanel: string) {
    let total: number;
    let totalSucces: number;
    let obj1 = {
      canal: chanel,
      statut: 'SUCCESSFUL',
    };
    let obj2 = {
      canal: chanel,
    };
    let obj3 = {
      canal: chanel,
      statut: 'Success',
    };
    this.subscriptionTauxByDevice = this.statistiqueService.getTransactionTotal(obj2).subscribe({
      next: value =>{
        total= value
        this.statistiqueService.getTransactionTotalMomo(obj2).subscribe({
          next: value =>{
            total = total+value
            this.statistiqueService.getTransactionTotalMomo(obj1).subscribe({
              next: value =>{
                totalSucces = value
                this.statistiqueService.getTransactionTotal(obj3).subscribe({
                  next: value =>{
                    if(chanel == "appmobile"){
                      totalSucces = totalSucces+value
                      this.percentAppmobilS = Math.floor(
                        (totalSucces * 100) / total
                      );
                      this.percentAppmobilE = Math.floor(100 - this.percentAppmobilS);

                      console.log("Nombre total par Appmobile", total)
                      console.log("percent succes par Appmobile", this.percentAppmobilS)
                    }else{
                      totalSucces = totalSucces+value
                      this.percentUssdS = Math.floor(
                        (totalSucces * 100) / total
                      );
                      this.percentUssdE = Math.floor(100 - this.percentUssdS);
                      console.log("Nombre total par Appmobile", total)
                      console.log("percent succes par Appmobile", this.percentUssdS)
                    }
     
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  // Formatage de la date en yyyy-MM-dd HH:mm:ss.SSS
  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    const milliseconds = this.padZero(date.getMilliseconds(), 3);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  // formattage des taux de string a number
  formatTaux(char: any): number {
    let chaine: string;

    chaine = char.taux.toString();
    chaine = chaine.trim().slice(0, -1);
    let taux = parseFloat(chaine);
    return taux;
  }
  padZero(value: number, length: number = 2): string {
    return value.toString().padStart(length, '0');
  }
}
