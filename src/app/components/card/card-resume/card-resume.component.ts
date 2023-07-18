import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-resume',
  templateUrl: './card-resume.component.html',
  styleUrls: ['./card-resume.component.scss'],
})
export class CardResumeComponent implements OnInit {
  @Input() total2!: number;
  @Input() total1!: number;
  @Input() typeCard!: string;
  @Input() title!: string;

  cardStyle: string
  bgStyle: string
  lineB: string

  constructor(private route: Router) {}

  ngOnInit(): void {
    switch (this.typeCard) {
      case 'green':
        this.cardStyle  = 'card-green'
        this.bgStyle  = 'bGreen bGreen-l'
        this.lineB  = 'greenLineB'
        break;

      case 'red':
        this.cardStyle  = 'card-red'
        this.bgStyle  = 'bRed bRed-l'
        this.lineB  = 'redLineB'
        break;

      case 'blue':
        this.cardStyle  = 'card-blue'
        this.bgStyle  = 'bBlue bBlue-l'
        this.lineB  = 'blueLineB'
        break;

      case 'yellow':
        this.cardStyle  = 'card-yellow'
        this.bgStyle  = 'bYellow bYellow-l'
        this.lineB  = 'yellowLineB'
        break;

      default:
        break;
    }
  }

  onStatNav(): void {
    this.route.navigate(['/administration/statistiques']);
  }
}
