import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatePipe } from './pipes/range-date.pipe';
import { TelephonePipe } from './pipes/telephone.pipe';


@NgModule({
  declarations: [
    RangeDatePipe,
    TelephonePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RangeDatePipe,
    TelephonePipe
  ]
})
export class SharedModule { }
