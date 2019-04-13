import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberInput]'
})
export class NumberInputDirective {

  @Input() numberPattern: string = '(\\d*)(\\d\\d)$';
  @Input() ngModel: any;
  constructor() { }

  @HostListener('input', ['$event'])
  checkPattern(event) {
    if (event.data === '.') {
      event.srcElement.value = this.ngModel;
      event.preventDefault();
      return;
    }
    let input = event.srcElement;
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
    if ( event.key === 'Unidentified' ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    } else if (/^[a-z|A-Z|\.|\+|-|\*|\\|=|'|"|`|~| |_|,|<|>|\?|-]$/.test(event.key)) {
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
