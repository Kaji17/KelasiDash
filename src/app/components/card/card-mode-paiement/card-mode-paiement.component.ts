import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-mode-paiement',
  templateUrl: './card-mode-paiement.component.html',
  styleUrls: ['./card-mode-paiement.component.scss']
})
export class CardModePaiementComponent implements OnInit{


  @Input()data: any;

  chartOptions: any;

  subscription: Subscription;
  @Input()progressMomo!: number;
  @Input()progressUssd!: number

  constructor(private route : Router){}

  ngOnInit(): void {
  }

  onStatNav(): void{
    this.route.navigate(['/administration/statistiques'])
  }

}
