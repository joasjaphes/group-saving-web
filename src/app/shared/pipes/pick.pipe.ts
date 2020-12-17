import { Pipe, PipeTransform } from '@angular/core';
import { pick, split } from 'lodash';
@Pipe({
  name: 'pick',
})
export class PickPipe implements PipeTransform {
  transform(value: any[], property: string): any {
    if (!property) {
      return value;
    }
    if (!value) {
      return value;
    }
    return pick(value, split(property, ','));
  }
}
