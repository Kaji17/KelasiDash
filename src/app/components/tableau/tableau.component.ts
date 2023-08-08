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
  inputValue: string;
  inputValueM: string;
  inputValueTransId: string;
  inputValueTransIdM: string;
  inputValueCanalA: string;
  inputValueCanalM: string;
  @Input() LisTransaction!: any[];
  @Input() ModePaiement!: string;
  @Output() newItemEvent = new EventEmitter();
  @Output() filterChange = new EventEmitter<string>();
  @Output() filterChangeM = new EventEmitter<string>();
  @Output() filterChangeCanalA = new EventEmitter<string>();
  @Output() filterChangeCanalM = new EventEmitter<string>();
  @Output() filterChangeTransA = new EventEmitter<string>();
  @Output() filterChangeTransM = new EventEmitter<string>();

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
    this.inputValue = '';
    this.inputValueM = '';
    this.inputValueCanalA = '';
    this.inputValueCanalM = '';
    this.inputValueTransId = '';
    this.inputValueTransIdM = '';
    this.statuses = [
      { label: 'Payé', value: 'Payé' },
      { label: 'Echoué', value: 'Echoué' },
      { label: 'En Attente', value: 'En Attente' },
    ];

    this.examens = [
      { label: 'CONCOURS', value: 'CONCOURS' },
      { label: 'BACG', value: 'BACG' },
      { label: 'BACT', value: 'BACT' },
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
    this.inputValue = '';
    this.inputValueM = '';
    this.inputValueCanalA = '';
    this.inputValueCanalM = '';
    this.inputValueTransId = '';
    this.inputValueTransIdM = '';
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
      case 'bact':
        return 'primary';
      default:
        return 'secondary';
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
    this.inputValue = '';
    this.inputValueM = '';
    this.inputValueCanalA = '';
    this.inputValueCanalM = '';
    this.inputValueTransId = '';
    this.inputValueTransIdM = '';
  }

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  // search by numéro liste airtime
  onInputChange() {
    this.filterChange.emit(this.inputValue);
  }
  // search by numéro liste momo
  onInputChangeM() {
    this.filterChangeM.emit(this.inputValueM);
  }
  // search by canal liste airtime
  onInputChangeCanalA() {
    this.filterChangeCanalA.emit(this.inputValueCanalA);
  }

  // search by canal liste momo
  onInputChangeCanalM() {
    this.filterChangeCanalM.emit(this.inputValueCanalM);
  }

  // search by canal liste airtime
  onInputChangeTransA() {
    this.filterChangeTransA.emit(this.inputValueTransId);
  }

  // search by canal liste airtime
  onInputChangeTransM() {
    this.filterChangeTransM.emit(this.inputValueTransIdM);
  }
}
