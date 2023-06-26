import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss'],
})
export class StatistiqueComponent implements OnInit {
  items: MenuItem[];
  items1: MenuItem[];
  data: any;
  dataP: any;
  menuSelected: number = 1;
  leSelect: number = 1;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Général',
        command: () => {
          this.menuSelected = 1;
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
          this.menuSelected = 1;
        },
      },
    ];
    this.data = {
      labels: ['Succes', 'Echecs'],
      datasets: [
        {
          data: [75, 5],
          backgroundColor: ['#07506A', '#EE6060'],
          hoverBackgroundColor: ['#07506A', '#EE6060'],
        },
      ],
    };
  }
}
