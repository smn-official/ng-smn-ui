import {AfterViewInit, Component, ViewEncapsulation, ElementRef} from '@angular/core';

@Component({
  selector: 'ui-input-container',
  template: `
    <div class="ui-input-wrap">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['input.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UiInputContainerComponent implements AfterViewInit {

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    const nativeElement = this.element.nativeElement;
    const inputWrap = nativeElement.getElementsByClassName('ui-input-wrap')[0];

    const icon = nativeElement.getElementsByClassName('icon')[0];
    const line = document.createElement('div');
    line.className = 'line';
    inputWrap.appendChild(line);

    if (icon) {
      const methodInsertIcon = icon === inputWrap.firstElementChild ? 'insertBefore' : 'appendChild';
      inputWrap.removeChild(icon);
      nativeElement[methodInsertIcon](icon, nativeElement.firstChild);
    }


  }

}
