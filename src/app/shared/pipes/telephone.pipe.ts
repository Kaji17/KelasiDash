import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone'
})
export class TelephonePipe implements PipeTransform {

  transform(num: string): string {

    return     num.replace('242', '+242 ');
  }

}
