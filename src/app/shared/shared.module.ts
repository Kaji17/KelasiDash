import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatePipe } from './pipes/range-date.pipe';


@NgModule({
  declarations: [
    RangeDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RangeDatePipe
  ]
})
export class SharedModule { }
