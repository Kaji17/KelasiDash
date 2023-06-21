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

  constructor() {}
  ngOnInit(): void {
    this.chiffreAffaire = 2000000;
    this.chiffreAffaireBac = 500000;
    this.nbrFund = 300;

    this.statuts = [{ name: 'Payé' }, { name: 'Rome' }];

    // this.customerService.getCustomersLarge().then((customers) => {
    //   this.customers = customers;
    //   this.loading = false;

    //   this.customers.forEach(
    //     (customer) => (customer.date = new Date(<Date>customer.date))
    //   );
    // });
  }

  //FILTRER PAR ID TRANSAC
  filterIdTransac() {}

  //FILTRER PAR MATRICULE
  filterMatricule() {}
}
