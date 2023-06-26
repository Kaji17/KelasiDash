import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-status',
  templateUrl: './stat-status.component.html',
  styleUrls: ['./stat-status.component.scss'],
})
export class StatStatusComponent implements OnInit {
  @Input()data: any;
  percentS: number
  percentE: number

  ngOnInit(): void {
    this.percentS = 90
    this.percentE =10
  }
}
