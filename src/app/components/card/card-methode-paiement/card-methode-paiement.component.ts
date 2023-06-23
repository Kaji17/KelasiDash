import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-methode-paiement',
  templateUrl: './card-methode-paiement.component.html',
  styleUrls: ['./card-methode-paiement.component.scss']
})
export class CardMethodePaiementComponent {

  @Input()title:string
  @Input()percentS: number
  @Input()percentE: number
}
