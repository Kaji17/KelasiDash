import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-mode-paiement-status',
  templateUrl: './stat-mode-paiement-status.component.html',
  styleUrls: ['./stat-mode-paiement-status.component.scss'],
})
export class StatModePaiementStatusComponent implements OnInit {
  data1: any;
  data2: any;

  ngOnInit() {
    this.data1 = {
      labels: ['Succes MoMo', 'Echec MoMo', 'Succes USSD', 'Echec USSD'],
      datasets: [
        {
          data: [300, 50, 200, 10],
          backgroundColor: ['#07506A', '#EE6060', '#FFA726', '#7E57C2'],
          hoverBackgroundColor: ['#07506A', '#EE6060', '#FFA726', '#7E57C2'],
        },
      ],
    };

    this.data2 = {
      labels: ['Succes', 'BEPC', 'BAC', 'Echec', 'CONCOURS', 'CEPE'],
      datasets: [
          {
              label: 'MoMo',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55]
          },
          {
              label: 'USSD',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27]
          }
      ]
  };
  }


}
