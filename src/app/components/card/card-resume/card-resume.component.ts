import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-resume',
  templateUrl: './card-resume.component.html',
  styleUrls: ['./card-resume.component.scss']
})
export class CardResumeComponent implements OnInit{

  @Input()total2!: number
  @Input()total1!: number
  @Input()typeCard!: string
  @Input()title!: string

  constructor(private route: Router){}

  ngOnInit(): void {

  }


  onStatNav(): void{
    this.route.navigate(['/administration/statistiques'])
  }
}
