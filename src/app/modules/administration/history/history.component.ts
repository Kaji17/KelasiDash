import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HistoryService } from 'src/app/shared/services/history.service';
import { StatistiqueService } from 'src/app/shared/services/statistique.service';
import { UtilisService } from 'src/app/shared/services/utilis.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  chiffreAffaire!: number;
  chiffreAffaireBac!: number;
  nbrFund!: number;
  transactions!: any[];
  idTransac!: any;
  matricule!: any;
  rangeDates!: Date[];
  statuts!: any[];
  selectedStatuts!: string;
  totalPage: number;
  listeAirtime: any = [];
  listeMoMo: any = [];
  boolList: boolean = true;
  modePaiement: string = 'Airtime';

  // SUSCRIPTION
  subscriptionSuccesA: Subscription;
  subscriptionListA: Subscription;
  // subscriptionListM: Subscription;

  constructor(
    private statistiqueService: StatistiqueService,
    private historyService: HistoryService,
    private utilisService: UtilisService
  ) {}
  ngOnInit(): void {
    this.totalPage = 0;
    this.chiffreAffaire = 0;
    this.chiffreAffaireBac = 500000;
    this.nbrFund = 300;
    this.initDataLocalStorage();
    this.refreshData();
    this.getAllTransactionA({ pagination: true, page: 0, size: 5 });
    this.statuts = [{ name: 'Payé' }, { name: 'Rome' }];
  }

  ngOnDestroy(): void {
    this.subscriptionSuccesA.unsubscribe();
    this.subscriptionListA.unsubscribe();
    // this.subscriptionListM.unsubscribe();
  }

  //FILTRER PAR ID TRANSAC
  filterIdTransac() {}

  //FILTRER PAR MATRICULE
  filterMatricule() {}

  // Initialisation du localStorage
  initDataLocalStorage() {
    localStorage.getItem('transairtime');
    localStorage.getItem('transmomo');
    let obj = {};
    localStorage.setItem('transairtime', JSON.stringify(obj));
    localStorage.setItem('transmomo', JSON.stringify(obj));

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

  gerePage(value: any) {
    // this.getAllTransactionA(value);
    if (this.boolList) {
      this.getAllTransactionA(value);
    } else {
      this.getAllTransactionM(value);
    }
  }

  gereToogle(value: any) {
    let obj = { pagination: true, page: 0, size: 5 };
    this.boolList = value;
    console.log(this.boolList);

    if (this.boolList) {
      this.transactions = [];
      this.totalPage = 0;
      this.getAllTransactionA(obj);
    } else {
      this.transactions = [];
      this.totalPage = 0;
      this.getAllTransactionM(obj);
    }

    //  this.boolList?this.getAllTransactionA(obj):this.getAllTransactionM(obj)

    this.boolList
      ? (this.modePaiement = 'Airtime')
      : (this.modePaiement = 'MoMo');
  }

  getAllTransactionA(obj: any) {
    // this.boolList?this.modePaiement== 'Airtime':this.modePaiement='MoMo'
    this.subscriptionListA = this.historyService
      .getAlltransactionAirtime(obj)
      .subscribe({
        next: (value) => {
          this.utilisService.response(value, (d: any) => {
            console.log(d);
            this.listeAirtime = d.content;
            console.log('data', this.listeAirtime);
            this.transactions = this.formateExam(this.formateStatu(d.content));
            this.totalPage = d.totalElements;
            console.log('je suis les données de airtime');
          });
        },
      });
  }

  getAllTransactionM(obj: any) {
    // this.boolList?this.modePaiement== 'Airtime':this.modePaiement='MoMo'
    this.subscriptionListA = this.historyService
      .getAlltransactionMoMo(obj)
      .subscribe({
        next: (value) => {
          this.utilisService.response(value, (d: any) => {
            console.log(d);
            this.listeMoMo = d.content;
            console.log('dataMomo', this.listeMoMo);
            this.transactions = this.formateExam(this.formateStatu(d.content));
            this.totalPage = d.totalElements;
            console.log('je suis les données de momo');
          });
        },
      });
  }

  // Formatage des different type de statu recuperer par l'API
  formateStatu(obj: []) {
    let e: any;
    for (e of obj) {
      switch (e.status) {
        case 'Subscriber has insufficient balance':
          console.log('fg', e.status);
          e.status = 'Echoué';
          break;
        case 'Problem with getting account details.':
          console.log('fg', e.status);
          e.status = 'Echoué';
          break;
        case 'Success':
          console.log('fg', e.status);
          e.status = 'Payé';
          break;
        case 'Pending':
          console.log('fg', e.status);
          e.status = 'En attente';
          break;
        case 'SUCCESSFUL':
          console.log('fg', e.status);
          e.status = 'Payé';
          break;
        case 'PENDING':
          console.log('fg', e.status);
          e.status = 'En attente';
          break;
        case 'FAILED':
          console.log('fg', e.status);
          e.status = 'Echoué';
          break;
        case e.status:
          console.log('fg', e.status);
          e.status = 'Echoué';
          break;
        default:
          break;
      }
    }
    return obj;
  }

  // Formatage des different type de statu recuperer par l'API
  formateExam(obj: []) {
    let e: any;
    for (e of obj) {
      switch (e.action) {
        case 'get_Result_Request_BACG':
          console.log('gf', e.action);
          e.action = 'BACG';
          break;
        case 'get_Center_Request_BACG':
          console.log('gf', e.action);
          e.action = 'BACG';
          break;
        case 'get_Result_Request_BACT':
          console.log('gf', e.action);
          e.action = 'BACT';
          break;
        case 'get_Center_Request_BACT':
          console.log('gf', e.action);
          e.action = 'BACT';
          break;

        case 'get_Result_Request_BEPC':
          console.log('gf', e.action);
          e.action = 'BEPC';
          break;
        case 'get_Center_Request_BEPC':
          console.log('gf', e.action);
          e.action = 'BEPC';
          break;
        case 'get_Result_Request_CEPE':
          console.log('gf', e.action);
          e.action = 'CEPE';
          break;
        case 'get_Center_Request_CEPE':
          console.log('gf', e.action);
          e.action = 'CEPE';
          break;
          case 'get_Result_Request_CONCOURS':
          console.log('gf', e.action);
          e.action = 'CONCOURS';
          break;
        case 'get_Center_Request_CONCOURS':
          console.log('gf', e.action);
          e.action = 'CONCOURS';
          break;
        default:
          break;
      }
    }
    return obj;
  }

  // Filtrage de la liste en fonction du numéro
  onFilterChange(filterValue: string) {
    let totalList: [];
    let totalItems: number;
    let obj = { pagination: false, msisdn: filterValue };

    switch (this.boolList) {
      // Vérifie si on est sur la page airtime
      case true:
        let longeur1 = filterValue.length;
        switch (longeur1) {
          case 0:
            console.log('Actualiser la liste normale');
            this.getAllTransactionA({ pagination: true, page: 0, size: 5 });
            break;
          case 12:
            this.subscriptionListA = this.historyService
              .getAlltransactionAirtime(obj)
              .subscribe({
                next: (value) => {
                  this.utilisService.response(value, (d: any) => {
                    console.log(d);
                    this.listeMoMo = d;
                    console.log('data', this.listeMoMo);
                    totalList = this.formateExam(this.formateStatu(d));
                    totalItems = totalList.length;
                    if (totalItems > 0) {
                      this.transactions = totalList;
                      this.totalPage = totalItems;
                      console.log('good djob', totalItems);
                      console.log('je suis les données de airtime');
                    }
                    console.log('je suis les données de airtime');
                  });
                },
              });

            console.log('here we go filter airtime by input');
            break;
        }
        break;
      default:
        break;

      // Vérifie si on est sur la page airtime
      case false:
        let longeur = filterValue.length;
        switch (longeur) {
          case 0:
            console.log('Actualiser la liste normale');
            this.getAllTransactionM({ pagination: true, page: 0, size: 5 });
            break;
          case 12:
            this.subscriptionListA = this.historyService
              .getAlltransactionMoMo(obj)
              .subscribe({
                next: (value) => {
                  this.utilisService.response(value, (d: any) => {
                    console.log(d);
                    this.listeMoMo = d;
                    console.log('data', this.listeMoMo);
                    totalList = this.formateExam(this.formateStatu(d));
                    totalItems = totalList.length;
                    if (totalItems > 0) {
                      this.transactions = totalList;
                      this.totalPage = totalItems;
                      console.log('good djob', totalItems);
                      console.log('je suis les données de airtime');
                    }
                    console.log('je suis les données de airtime');
                  });
                },
              });

            console.log('here we go filter airtime by input');
            break;
        }
        break;
    }
  }

  // Filtrage de la liste en fonction de la plateforme de souscription
  onFilterChangeP(filterValue: string) {
    let totalList: [];
    let totalItems: number;
    let obj = { pagination: false, canal: filterValue };

    switch (this.boolList) {
      // Vérifie si on est sur la page airtime
      case true:
        let longeur1 = filterValue.length;
        switch (filterValue) {
          case '':
            console.log('Actualiser la liste normale');
            this.getAllTransactionA({ pagination: true, page: 0, size: 5 });
            break;
          case 'appmobile':
            this.subscriptionListA = this.historyService
              .getAlltransactionAirtime(obj)
              .subscribe({
                next: (value) => {
                  this.utilisService.response(value, (d: any) => {
                    console.log(d);
                    this.listeMoMo = d;
                    console.log('data', this.listeMoMo);
                    totalList = this.formateExam(this.formateStatu(d));
                    totalItems = totalList.length;
                    if (totalItems > 0) {
                      this.transactions = totalList;
                      this.totalPage = totalItems;
                      console.log('good djob', totalItems);
                      console.log(
                        'je suis les données de airtime apres filtrage par appmobile'
                      );
                    }
                    console.log('je suis les données de airtime');
                  });
                },
              });

            console.log('here we go filter airtime by input');
            break;
          case 'ussd':
            this.subscriptionListA = this.historyService
              .getAlltransactionAirtime(obj)
              .subscribe({
                next: (value) => {
                  this.utilisService.response(value, (d: any) => {
                    console.log(d);
                    this.listeMoMo = d;
                    console.log('data', this.listeMoMo);
                    totalList = this.formateExam(this.formateStatu(d));
                    totalItems = totalList.length;
                    if (totalItems > 0) {
                      this.transactions = totalList;
                      this.totalPage = totalItems;
                      console.log('good djob', totalItems);
                      console.log(
                        'je suis les données de airtime apres filtrage par ussd'
                      );
                    }
                    console.log('je suis les données de airtime');
                  });
                },
              });

            console.log('here we go filter airtime by input');
            break;
          default:
            break;
        }
        break;
      // Vérifie si on est sur la page airtime
      case false:
        let longeur = filterValue.length;
        switch (filterValue) {
          case '':
            console.log('Actualiser la liste normale');
            this.getAllTransactionM({ pagination: true, page: 0, size: 5 });
            break;
          case 'appmobile':
            this.subscriptionListA = this.historyService
              .getAlltransactionMoMo(obj)
              .subscribe({
                next: (value) => {
                  this.utilisService.response(value, (d: any) => {
                    console.log(d);
                    this.listeMoMo = d;
                    console.log('data', this.listeMoMo);
                    totalList = this.formateExam(this.formateStatu(d));
                    totalItems = totalList.length;
                    if (totalItems > 0) {
                      this.transactions = totalList;
                      this.totalPage = totalItems;
                      console.log('good djob', totalItems);
                      console.log(
                        'je suis les données de momo apres filtrage par appmobile'
                      );
                    }
                    console.log('je suis les données de momo');
                  });
                },
              });

            console.log('here we go filter momo by input');
            break;
          case 'ussd':
            this.subscriptionListA = this.historyService
              .getAlltransactionMoMo(obj)
              .subscribe({
                next: (value) => {
                  this.utilisService.response(value, (d: any) => {
                    console.log(d);
                    this.listeMoMo = d;
                    console.log('data', this.listeMoMo);
                    totalList = this.formateExam(this.formateStatu(d));
                    totalItems = totalList.length;
                    if (totalItems > 0) {
                      this.transactions = totalList;
                      this.totalPage = totalItems;
                      console.log('good djob', totalItems);
                      console.log(
                        'je suis les données de momo apres filtrage par ussd'
                      );
                    }
                    console.log('je suis les données de momo');
                  });
                },
              });

            console.log('here we go filter momo by input');
            break;
        }
        break;
    }
  }
}
