import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  data: any;

  chartOptions: any;

  subscription: Subscription;

  // config: AppConfig;
  chiffreAffaire!: number
  tottalTransaction!: number
  totalEchec!: number
  progressMomo!: number;
  progressUssd!: number;
  titleAppMobile!: string
  titleUSSD!: string
  ngOnInit(): void {
    this.chiffreAffaire= 2000000
    this.tottalTransaction= 500
    this.progressMomo= 70
    this.progressUssd=30
    this.totalEchec=250
    this.titleAppMobile= 'Résumé transaction App mobile'
    this.titleUSSD= 'Résumé transaction USSD'
    this.data = {
      datasets: [{
          data: [
              11,
              16
          ],
          backgroundColor: [
              "#EE6060",
              "#39A74B",
          ],
          label: 'My dataset'
      }],
      labels: [
          "Echec",
          "Succes",
      ]
  };
  }


}
