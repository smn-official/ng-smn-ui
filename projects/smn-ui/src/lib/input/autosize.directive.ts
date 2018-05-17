import {ElementRef, HostListener, Directive, OnChanges, Input} from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;

@Directive({
    selector: '[autosize]'
})

export class UiInputAutosizeDirective implements OnChanges {
    private retries = 0;
    private textAreaEl: any;
    @Input() ngModel;

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();
        } else {
            this.textAreaEl = this.element.nativeElement;
        }
    }

    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.getElementsByTagName('textarea')[0];
        if (!this.textAreaEl) {
            if (this.retries >= MAX_LOOKUP_RETRIES) {
                console.error('textarea não encontrado');

            } else {
                this.retries++;
                setTimeout(() => {
                    this._findNestedTextArea();
                }, 100);
            }
        }
    }

    ngOnChanges(changes) {
        this.adjust();
    }

    adjust(): void {
        if (!!this.textAreaEl) {
            this.textAreaEl.style.overflow = 'hidden';
            this.textAreaEl.style.height = 'auto';
            this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
        }
    }
}
