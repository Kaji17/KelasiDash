import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss'],
})
export class TableauComponent implements OnInit, OnChanges {
  paiementMode: string;
  @Input() LisTransaction!: any[];
  @Input() ModePaiement!: string;
  @Output() newItemEvent = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.paiementMode = this.ModePaiement;
  }

  representatives!: any[];

  statuses!: any[];

  examens!: any[];

  device!: any[];

  paiement!: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  matricule!: any;

  metaKeySelection: boolean = true;

  ngOnInit(): void {
    this.statuses = [
      { label: 'Payé', value: 'Payé' },
      { label: 'Echoué', value: 'Echoué' },
      { label: 'En Attente', value: 'En Attente' },
    ];

    this.examens = [
      { label: 'CONCOURS', value: 'CONCOURS' },
      { label: 'BACG', value: 'BACG' },
      { label: 'BEPC', value: 'BEPC' },
      { label: 'CEPE', value: 'CEPE' },
    ];

    this.device = [
      { label: 'APP MOBILE', value: 'APP MOBILE' },
      { label: 'USSD', value: 'USSD' },
    ];

    this.paiement = [
      { label: 'MoMo', value: 'MoMo' },
      { label: 'Airtime', value: 'Airtime' },
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

      case 'bacg':
        return 'success';

      case 'bepc':
        return 'info';

      case 'cepe':
        return 'warning';
      default:
        return null;
    }
  }

  // DONNE LA COULEUR DU TAG EN FOCTION DE L'EXAMEN
  getSeverityS(status: string): string {
    switch (status.toLowerCase()) {
      case 'echoué':
        return 'danger';

      case 'payé':
        return 'success';

      case 'en attente':
        return 'warning';
      default:
        return null;
    }
  }

  handleChange(e) {
    let isChecked = e.checked;
    this.addNewItem(isChecked);
  }

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }
}
