import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';
@Pipe({
  name: 'differenceBy',
})
export class DifferenceByPipe implements PipeTransform {
  constructor() {}

  transform(input: any[], key: string, ...args: any[]): any[];
  transform<T>(input: T, key: string, ...args: any[]): T;

  transform(input: any, key: string, ...args: any[]): any {
    if (!Array.isArray(input)) {
      return input;
    }

    return args.reduce(
      // tslint:disable-next-line: no-bitwise
      (d, c) => d.filter((e: any) => (find(c, { [key]: e[key] }) ? null : e)),
      input
    );
  }
}
