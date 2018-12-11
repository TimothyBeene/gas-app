import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberInput]'
})
export class NumberInputDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  checkPattern(event) {
    let input = event.target;
    let tempValue = input.value;
    tempValue = tempValue.replace(/\./g, '');
    if ( tempValue.length > 2 ) {
      const parsed = /(\d*)(\d\d)$/.exec(tempValue);
      tempValue = parsed[1] + '.' + parsed[2];
    }
    input.value = tempValue;
  }

  @HostListener('keydown', ['$event'])
  noPeriods(event: KeyboardEvent) {
    if (/^[a-z|A-Z|\.|\+|-|\*|\\|=|'|"|`|~| |_|,|<|>|\?|-]$/.test(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  @HostListener('wheel')
  blurThis() {
    return false;
  }

}
