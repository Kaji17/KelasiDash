import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  chiffreAffaire!: number
  tottalTransaction!: number
  totalEchec!: number
  ngOnInit(): void {
    this.chiffreAffaire= 2000000
    this.tottalTransaction= 500
    this.totalEchec=250
  }


}
