import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import * as _ from 'lodash';
@Pipe({
  name: 'checkIfDateRangePipe',
})
export class CheckIfDateRangePipe implements PipeTransform {
  constructor() {}

  transform(array): any {
    return _.find(
      array,
      (item) =>
        format(new Date(item.start), 'yyyy/MM/dd') !==
        format(new Date(item.end), 'yyyy/MM/dd')
    )
      ? true
      : false;
  }
}
