import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'checkIfInList',
})
export class CheckIfInListPipe implements PipeTransform {
  constructor() {}

  transform(value: any, array, key, propertyInList?: any): any {
    if (propertyInList) {
      array = _.map(array, (arrayItem) => {
        return _.get(arrayItem, propertyInList);
      });
    }

    return _.isObject(_.find(array, { [key]: value }));
  }
}
