import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'rangeDate',
})
export class RangeDatePipe implements PipeTransform {
  transform(rangeDate: Date, args?: any): any {
    if (rangeDate) {
      let range = rangeDate.toDateString();
      let tabrange = range.split(',');
      tabrange = tabrange.map((d) => moment(d).format('DD/MM/YYYY'));
      return tabrange[0] + ' - ' + tabrange[1];
    }else{
      return null 
    }
  }
}
