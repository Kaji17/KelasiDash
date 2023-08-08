import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-mode-paiement-status',
  templateUrl: './stat-mode-paiement-status.component.html',
  styleUrls: ['./stat-mode-paiement-status.component.scss'],
})
export class StatModePaiementStatusComponent implements OnInit {
  @Input() dataTabMoMo: number[];
  @Input() dataTabAirtime: number[];
  @Input() dataTab: number[];
  data2: any;
  data1: any;

  ngOnInit() {
    this.data1 = {
      labels: ['Succes MoMo', 'Echec MoMo', 'Succes Airtime', 'Echec Airtime'],
      datasets: [
        {
          data: this.dataTab,
          backgroundColor: ['#07506A', '#EE6060', '#FFA726', '#7E57C2'],
          hoverBackgroundColor: ['#07506A', '#EE6060', '#FFA726', '#7E57C2'],
        },
      ],
    };

    this.data2 = {
      labels: ['Succès', 'App mobile succès', 'Ussd succès', 'Echec', 'Ussd échec', 'App mobile échec'],
      datasets: [
        {
          label: 'Airtime',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: this.dataTabAirtime,
        },
        {
          label: 'MoMo',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: this.dataTabMoMo,
        },
        
      ],
    };
  }
}
