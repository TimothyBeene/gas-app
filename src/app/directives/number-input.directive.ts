import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberInput]'
})
export class NumberInputDirective {

  @Input() numberPattern: string = '(\\d*)(\\d\\d)$';
  constructor() { }

  @HostListener('input', ['$event'])
  checkPattern(event) {
    let input = event.target;
    let tempValue = input.value;
    tempValue = tempValue.replace(/\./g, '');
    const regex = new RegExp(this.numberPattern);
    const parsed = regex.exec(tempValue);
    if ( parsed && parsed[2] ) {
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
