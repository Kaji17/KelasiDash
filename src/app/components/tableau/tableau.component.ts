import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss'],
})
export class TableauComponent implements OnInit {
  @Input() LisTransaction!: any[];

  representatives!: any[];

  statuses!: any[];

  examens!: any[];

  device!: any[];

  paiement!: any[]

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  matricule!: any

  founded!: number

  ngOnInit(): void {
    this.founded = 10
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'Payé', value: 'Payé' },
      { label: 'Echoué', value: 'Echoué' }
    ];

    this.examens = [
      { label: 'CONCOURS', value: 'CONCOURS' },
      { label: 'BAC', value: 'BAC' },
      { label: 'BEPC', value: 'BEPC' },
      { label: 'CEPE', value: 'CEPE' }
    ];

    this.device = [
      { label: 'App mobile', value: 'App mobile' },
      { label: 'Airtimes', value: 'airtimes' }
    ];

    this.paiement = [
      { label: 'MoMo', value: 'MoMo' },
      { label: 'Airtimes', value: 'airtimes' }
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  // DONNE LA COULEUR DU TAG EN FOCTION DE L'EXAMEN
  getSeverity(status: string): string {
    switch (status.toLowerCase()) {
      case 'concours':
        return 'danger';

      case 'bac':
        return 'success';

      case 'bepc':
        return 'info';

      case 'cepe':
        return 'warning';
      default:
        return null;
    }
  }
}
