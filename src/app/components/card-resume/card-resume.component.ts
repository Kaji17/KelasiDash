import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {

  }

}
