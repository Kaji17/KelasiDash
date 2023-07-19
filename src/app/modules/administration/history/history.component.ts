import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  chiffreAffaire!: number;
  chiffreAffaireBac!: number;
  nbrFund!: number;
  transactions!: any[];
  idTransac!: any;
  matricule!: any;
  rangeDates!: Date[];
  statuts!: any[];
  selectedStatuts!: string;

  // SUSCRIPTION
  subscriptionSuccesA: Subscription;

  constructor(private statistiqueService: StatistiqueService) {}
  ngOnInit(): void {
    this.chiffreAffaire = 0;
    this.chiffreAffaireBac = 500000;
    this.nbrFund = 300;
    this.initDataLocalStorage();
    this.refreshData();
    this.statuts = [{ name: 'Payé' }, { name: 'Rome' }];
  }

  ngOnDestroy(): void {
    this.subscriptionSuccesA.unsubscribe();
  }

  //FILTRER PAR ID TRANSAC
  filterIdTransac() {}

  //FILTRER PAR MATRICULE
  filterMatricule() {}

  // Initialisation du localStorage
  initDataLocalStorage() {
    if (!localStorage.getItem('lastCAData')) {
      let obj = {
        value: '',
        lastDate: '',
      };
      localStorage.setItem('lastCAData', JSON.stringify(obj));
    }
  }

  // Récuperation du chiffre d'affaire d'Airtimes et Momo des transactions réussits
  getChiffreAffaireAirtimeMoMo(ca?: any, ca1?: any, obj?: any) {
    let total1: number;
    this.subscriptionSuccesA = this.statistiqueService
      .getMontantTotal(ca)
      .subscribe({
        next: (value) => {
          total1 = value;
          console.log('montantTottal', this.chiffreAffaire);
          this.statistiqueService.getMontantTotalMomo(ca1).subscribe({
            next: (value) => {
              this.chiffreAffaire = total1 + value;
              console.log('montantTottal2', this.chiffreAffaire);

              obj.value = this.chiffreAffaire;
              obj.lastDate = this.formatDateTime(new Date());
              localStorage.setItem('lastCAData', JSON.stringify(obj));
            },
          });
        },
      });
  }

  // Récuperer les données grace au localStorage pour réduire le temps de chargement
  refreshData() {
    // Check la dernière valeur du chiffre d'affaire dans le localStorage
    let last = JSON.parse(localStorage.getItem('lastCAData'));
    console.log('thonnn,', last.value);

    // Si il n'y a aucune valeur faire un getAll de toute les valeurs
    if (last.value == '') {
      let ca = {
        statut: 'Success',
      };

      let ca1 = {
        statut: 'SUCCESSFUL',
      };

      let obj = {
        value: '',
        lastDate: '',
      };
      this.getChiffreAffaireAirtimeMoMo(ca, ca1, obj);
    }
    // Sinon recuperer le chiffre d'affaire de puis la dernière date jusqu'a  cet intant et l'additionner avec la dernière
    else {
      let obj: any;
      obj = JSON.parse(localStorage.getItem('lastCAData'));
      let ca = {
        datedebut: this.formatDateTime(new Date(obj.lastDate)),
        statut: 'Success',
      };

      let ca1 = {
        datedebut: this.formatDateTime(new Date(obj.lastDate)),
        statut: 'SUCCESSFUL',
      };

      let newChiffreAffaire: number;

      let total1: number;
      this.subscriptionSuccesA = this.statistiqueService
        .getMontantTotal(ca)
        .subscribe({
          next: (value) => {
            total1 = value;
            console.log('mothonTottal', this.chiffreAffaire);
            this.statistiqueService.getMontantTotalMomo(ca1).subscribe({
              next: (value) => {
                newChiffreAffaire = total1 + value;
                console.log('mothon', newChiffreAffaire);

                this.chiffreAffaire = obj.value + newChiffreAffaire;
                obj.value = this.chiffreAffaire;
                obj.lastDate = this.formatDateTime(new Date());
                localStorage.setItem('lastCAData', JSON.stringify(obj));
              },
            });
          },
        });
    }
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
