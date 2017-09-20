import {
    AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output,
    Renderer2
} from '@angular/core';

@Directive({
    selector: '[uiInput]'
})

export class UiInputDirective implements AfterViewInit, OnChanges {
    placeholder: string;
    @Input() ngModel: any;
    @Input() persistPlaceholder: boolean;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

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

    @HostListener('blur')
    onBlur() {
        this.isEmpty(this.ngModel);
    }

    @HostListener('focus')
    onFocus() {
        this.isEmpty(this.ngModel);
        this.setPlaceholder(this.placeholder);
    }

    @HostListener('focusout')
    onFocusout() {
        this.setPlaceholder();
    }

    isEmpty(value: any): void {
        // TODO: Try model e view value
        const self = this;
        function isEmpty() {
            let action = !value && !self.element.nativeElement.value ? 'addClass' : 'removeClass';
            if (self.ngModel && self.ngModel.trim && !self.ngModel.trim()) {
                action = 'addClass';
            }
            self.renderer[action](self.element.nativeElement, 'ui-empty');
        }

        isEmpty();
        setTimeout(isEmpty);
    }

    setPlaceholder(value?: string) {
        value = this.persistPlaceholder ? this.placeholder : value || '';
        this.renderer.setProperty(this.element.nativeElement, 'placeholder', value);
    }
}
