import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpperCase'
})
export class FirstUpperCasePipe implements PipeTransform {

  transform(value: string): any {
    if (!value) {
      return value;
    }
    const str = value.split(' ');

    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(' ');
  }

}
