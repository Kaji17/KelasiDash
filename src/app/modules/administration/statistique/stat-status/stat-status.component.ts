import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-status',
  templateUrl: './stat-status.component.html',
  styleUrls: ['./stat-status.component.scss'],
})
export class StatStatusComponent implements OnInit {
  @Input()data: any;
  @Input()percentS: number
  @Input()percentE: number

  ngOnInit(): void {
    // this.percentS = 0
    // this.percentE =0
  }
}
