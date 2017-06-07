import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[uiInput]'
})

export class UiInputDirective implements AfterViewInit, OnChanges {

  @Input() ngModel: any;
  @Input() persistPlaceholder: boolean;
  placeholder: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.placeholder = element.nativeElement.placeholder;

  }

  ngAfterViewInit() {
    this.renderer.addClass(this.element.nativeElement, 'ui-control');
    this.setPlaceholder();
  }

  ngOnChanges() {
    this.isEmpty(this.ngModel);
  }

  @HostListener('blur') onBlur() {
    this.isEmpty(this.ngModel);
  }

  @HostListener('focus') onFocus() {
    this.isEmpty(this.ngModel);
    this.setPlaceholder(this.placeholder);
  }

  @HostListener('focusout') onFocusout() {
    this.setPlaceholder();
  }

  isEmpty(value: any): void {
    const action = !value ? 'addClass' : 'removeClass';
    this.renderer[action](this.element.nativeElement, 'ui-empty');
  }

  setPlaceholder(value?: string) {
    value = this.persistPlaceholder ? this.placeholder : value || '';
    this.renderer.setProperty(this.element.nativeElement, 'placeholder', value);
  }
}
