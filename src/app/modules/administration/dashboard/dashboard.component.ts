import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { Configurable } from 'src/app/core/config';
import { StatistiqueService } from 'src/app/shared/services/statistique.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any;
  chartOptions: any;
  chiffreAffaire!: number;
  tottalTransaction: number;
  tottalTransactionSuccess!: number;
  tottalTransactionEchec!: number;
  tottalTransactionPending!: number;
  tottalTransactionSuscriber!: number;
  tottalTransactionProblem!: number;
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

  // SUSCRIBE
  subscriptionATotalamount: Subscription;
  subscriptionCountAirStat: Subscription;
  subscriptionCountMoMoSta: Subscription;

  constructor(
    private configService: Configurable,
    private statistiqueService: StatistiqueService
  ) {}

  ngOnInit(): void {
    this.objChiffreaffaire = {};
    this.getTotalTransaction();
    this.getChiffreAffaireAirtimeMoMo();
    this.getTotalTransactionM();
    this.tottalTransactionSuccess = 0;
    this.tottalTransactionEchec = 0;
    this.tottalTransactionPending = 0;
    this.tottalTransactionProblem = 0;
    this.tottalTransactionSuscriber = 0;
    this.getTotalTransactionEchec();
    this.tottalTransaction = 0;
    this.CA = 0;
    this.chiffreAffaire = 0;
    this.TT = 0;
    this.progressMomo = 70;
    this.progressUssd = 30;
    this.totalEchec = 250;
    this.titleAppMobile = 'Résumé transaction App mobile';
    this.titleUSSD = 'Résumé transaction USSD';
    this.data = {
      datasets: [
        {
          data: [11, 16],
          backgroundColor: ['#EE6060', '#39A74B'],
          label: 'My dataset',
        },
      ],
      labels: ['Echec', 'Succes'],
    };
  }
  countagge() {
    this.countCA = setInterval(() => {
      this.verify();
    }, 1);
  }
  ngOnDestroy(): void {
    this.subscriptionATotalamount.unsubscribe();
    this.subscriptionCountMoMoSta.unsubscribe();
    this.subscriptionCountAirStat.unsubscribe();
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
          console.log('le :', total1);
        },
      });
    this.subscriptionCountAirStat = this.statistiqueService
      .getTransactionTotal()
      .subscribe({
        next: (total) => {
          console.log('le 2 :', total);
          this.tottalTransaction = total + total1;
          console.log('Total__Trans_final:', this.tottalTransaction);
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

  // Recuperer le nombre total des transactions par reussit
  getTotalTransactionSuccess() {
    let val1;
    let ca = {
      statut: 'Success',
    };

    let ca2 = {
      statut: 'SUCCESSFUL',
    };

    this.subscriptionSuccesA = this.statistiqueService
      .getTransactionTotal(ca)
      .subscribe({
        next: (total) => {
          val1 = total;
        },
      });

    this.subscriptionSuccesM = this.statistiqueService.getTransactionTotalMomo(ca2).subscribe({
      next: total =>{
        this.tottalTransactionSuccess = val1+total
        console.log('TOTAL trans Succes:', this.tottalTransactionSuccess)
      }
    })

    console.log('TOTAL CHIFFRE AFFAIRE: ', this.tottalTransactionSuccess);
  }

  getTotalTransactionEchec() {
    let ca1 = {
      statut: 'Pending',
    };
    let ca2 = {
      statut: 'Problem with getting account details.',
    };
    let ca3 = {
      statut: 'Subscriber has insufficient balance',
    };
    let val1;
    let val2;
    let val3;
    val1 = this.getTotalTransactionStatus(ca1);
    val2 = this.getTotalTransactionStatus(ca2);
    val3 = this.getTotalTransactionStatus(ca3);

    this.tottalTransactionEchec = val1 + val2 + val3;
  }

  // Recuperer le nombre total de toute les transactions par MoMo
  getTotalTransactionM() {
    this.statistiqueService.getTransactionTotalMomo().subscribe({
      next: (value) => {
        console.log(`Transaction MoMo, ${value}`);
      },
    });
  }

  // Récuperation du chiffre d'affaire d'Airtimes et Momo des transactions réussits
  getChiffreAffaireAirtimeMoMo(obj?: {}) {
    let ca = {
      statut: 'Success',
    };

    let ca1 = {
      statut: 'SUCCESSFUL',
    };

    let total1: number;
    this.statistiqueService.getMontantTotal(ca).subscribe({
      next: (value) => {
        total1 = value;
        console.log('montantTottal', this.chiffreAffaire);
        this.statistiqueService.getMontantTotalMomo(ca1).subscribe({
          next: (value) => {
            this.chiffreAffaire = total1 + value;
            console.log('montantTottal2', this.chiffreAffaire);
          },
        });
      },
    });
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

  padZero(value: number, length: number = 2): string {
    return value.toString().padStart(length, '0');
  }
}
