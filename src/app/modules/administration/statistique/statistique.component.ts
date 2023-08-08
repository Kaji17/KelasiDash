import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { StatistiqueService } from 'src/app/shared/services/statistique.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  items1: MenuItem[];
  data: any;
  dataP: any;
  menuSelected: number = 1;
  menuSelected1: number = 1;

  leSelect: number = 1;
  subscriptionCountMoMoSta: Subscription;
  subscriptionATotalamount: Subscription;
  subscriptionSuccesM: Subscription;
  subscriptionCountM: Subscription;
  subscriptionCountA: Subscription;
  subscriptionCountByDevic: Subscription;

  tottalTransaction: number;
  tottalTransactionSuccess: number;
  tottalTransactionEchec: number;
  tabOfPercent: number[];
  percentE: number;
  percentS: number;

  datasetModePaiement: number[];
  dataTabAirtime: number[];
  dataTabMoMo: number[];

  totalCountMoMo: number;
  totalCountAirtime: number;
  totalCountMoMoS: number;
  totalCountAirtimeS: number;
  totalCountMoMoE: number;
  totalCountAirtimeE: number;

  totalCountAirtimeAppmobileS: number;
  totalCountAirtimeAppmobileE: number;
  totalCountAirtimeUssdS: number;
  totalCountAirtimeUssdE: number;

  totalCountMoMoAppmobileS: number;
  totalCountMoMoAppmobileE: number;
  totalCountMoMoUssdS: number;
  totalCountMoMoUssdE: number;

  ngOnInit(): void {
    // this.tabOfPercent = [10,10]
    this.items = [
      {
        label: 'Général',
        command: () => {
          this.menuSelected = 1;
          this.getTotalTransaction();
          this.getTotalTransactionSuccessEchec();
        },
      },
      {
        label: 'Période',
        command: () => {
          this.menuSelected = 2;
        },
      },
      {
        label: 'Mode de paiement',
        command: () => {
          this.menuSelected = 3;
        },
      },
    ];

    this.items1 = [
      {
        label: 'Général',
        command: () => {
          this.menuSelected1 = 1;
        },
      },
    ];
    this.getTotalTransaction();
    this.getTotalTransactionSuccessEchec();
    this.getSuccesMoMo();
    this.getCountAirtimeByDevice();
    // this.getSuccesAirtime()
  }

  constructor(private statistiqueService: StatistiqueService) {}
  ngOnDestroy(): void {
    this.subscriptionCountMoMoSta.unsubscribe();
    // this.subscriptionATotalamount.unsubscribe();
    this.subscriptionSuccesM.unsubscribe();
    this.subscriptionCountM.unsubscribe();
    // this.subscriptionCountA.unsubscribe();
    this.subscriptionCountByDevic.unsubscribe();
  }
  // Recuperer le nombre total de toute les transactions
  getTotalTransaction() {
    let total1: number;
    this.subscriptionCountMoMoSta = this.statistiqueService
      .getTransactionTotalMomo()
      .subscribe({
        next: (total) => {
          total1 = total;
          this.totalCountMoMo = total;
          this.subscriptionATotalamount = this.statistiqueService
            .getTransactionTotal()
            .subscribe({
              next: (total) => {
                this.totalCountAirtime = total;
                this.tottalTransaction = total + total1;
                console.log('Total__Trans_final:', this.tottalTransaction);
                this.getTotalTransactionSuccessEchec();
              },
            });
        },
      });
  }

  // Recuperer le nombre total des transactions par reussit et échoué
  getTotalTransactionSuccessEchec() {
    let ca = {
      statut: 'Success',
    };

    let ca2 = {
      statut: 'SUCCESSFUL',
    };

    this.subscriptionSuccesM = this.statistiqueService
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
              this.tabOfPercent = [
                this.tottalTransactionSuccess,
                this.tottalTransactionEchec,
              ];
              console.log('tab', this.tabOfPercent);
              this.data = {
                labels: ['Succes', 'Echecs'],
                datasets: [
                  {
                    data: this.tabOfPercent,
                    backgroundColor: ['#07506A', '#EE6060'],
                    hoverBackgroundColor: ['#07506A', '#EE6060'],
                  },
                ],
              };
              this.percentS = Math.floor(
                (this.tottalTransactionSuccess * 100) / this.tottalTransaction
              );
              this.percentE = Math.floor(
                (this.tottalTransactionEchec * 100) / this.tottalTransaction
              );
            },
          });
        },
      });

    console.log('TOTAL CHIFFRE AFFAIRE: ', this.tottalTransactionSuccess);
  }

  getSuccesMoMo() {
    this.subscriptionCountM = this.statistiqueService
      .getTransactionTotalMomo({ statut: 'SUCCESSFUL' })
      .subscribe({
        next: (value) => {
          this.totalCountMoMoS = value;
          // this.datasetModePaiement.push(this.totalCountMoMoS)
          this.totalCountMoMoE = this.totalCountMoMo - this.totalCountMoMoS;
          // this.datasetModePaiement.push(this.totalCountMoMoE)
          this.getSuccesAirtime();
        },
      });
  }

  getSuccesAirtime() {
    this.subscriptionCountA = this.statistiqueService
      .getTransactionTotal({ statut: 'Success' })
      .subscribe({
        next: (value) => {
          this.totalCountAirtimeS = value;
          // this.datasetModePaiement.push(this.totalCountAirtimeS)
          this.totalCountAirtimeE =
            this.totalCountAirtime - this.totalCountAirtimeS;
          this.datasetModePaiement = [
            this.totalCountMoMoS,
            this.totalCountMoMoE,
            this.totalCountAirtimeS,
            this.totalCountAirtimeE,
          ];
          console.log('DATASETMODE', this.datasetModePaiement);
        },
      });
  }

  getCountAirtimeByDevice() {
    this.subscriptionCountByDevic = this.statistiqueService
      .getTransactionTotal({ canal: 'appmobile', statut: 'Success' })
      .subscribe({
        next: (value) => {
          this.totalCountAirtimeAppmobileS = value;
          this.totalCountAirtimeAppmobileE =
            this.totalCountAirtime - this.totalCountAirtimeAppmobileS;
          this.statistiqueService
            .getTransactionTotal({
              canal: 'ussd',
              statut: 'Success',
            })
            .subscribe({
              next: (value) => {
                this.totalCountAirtimeUssdS = value;
                this.totalCountAirtimeUssdE =
                  this.totalCountAirtime - value;

                this.statistiqueService
                  .getTransactionTotalMomo({
                    canal: 'appmobile',
                    statut: 'SUCCESSFUL',
                  })
                  .subscribe({
                    next: (value) => {
                      this.totalCountMoMoAppmobileS = value;
                      this.totalCountMoMoAppmobileE =
                        this.totalCountMoMo - value;
                      this.statistiqueService
                        .getTransactionTotalMomo({
                          canal: 'ussd',
                          statut: 'SUCCESSFUL',
                        })
                        .subscribe({
                          next: (value) => {
                            this.totalCountMoMoUssdS = value;
                            this.totalCountMoMoUssdE =
                              this.totalCountMoMo - this.totalCountMoMoUssdS;
                            this.dataTabAirtime = [
                              this.totalCountAirtimeS,
                              this.totalCountAirtimeAppmobileS,
                              this.totalCountAirtimeUssdS,
                              this.totalCountAirtimeE,
                              this.totalCountAirtimeUssdE,
                              this.totalCountAirtimeAppmobileE,
                            ];
                            console.log(
                              'DATASOURCE AIRTIME',
                              this.dataTabAirtime
                            );
                            this.dataTabMoMo = [
                              this.totalCountMoMoS,
                              this.totalCountMoMoAppmobileS,
                              this.totalCountMoMoUssdS,
                              this.totalCountMoMoE,
                              this.totalCountMoMoUssdE,
                              this.totalCountMoMoAppmobileE,
                            ];
                            console.log('DATASOURCE MOMO', this.dataTabAirtime);
                          },
                        });
                    },
                  });
              },
            });
        },
      });
  }
}
