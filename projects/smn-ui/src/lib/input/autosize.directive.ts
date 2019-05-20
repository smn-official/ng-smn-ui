import {ElementRef, HostListener, Directive, OnChanges, Input, AfterViewInit, DoCheck} from '@angular/core';

const MAX_LOOKUP_RETRIES = 3;

@Directive({
    selector: '[autosize]'
})

export class UiInputAutosizeDirective implements OnChanges, AfterViewInit, DoCheck {
    private retries = 0;
    private textAreaEl: any;
    @Input() ngModel;

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    @HostListener('change', ['$event.target'])
    onChange(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();
        } else {
            this.textAreaEl = this.element.nativeElement;
        }
    }

    // Faz com que o autosize execute quando a tela for carregada, para casos em que o campo iniciar preenchido
    ngAfterViewInit() {
        setTimeout(() => {
            this.adjust();
        });
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

    ngDoCheck() {
        // this.adjust();
    }

    // setTimeout para aguardar a atualização da model do input
    ngOnChanges(changes) {
        setTimeout(() => {
            this.adjust();
        });
    }

    adjust(): void {
        if (!!this.textAreaEl) {
            this.textAreaEl.style.overflow = 'hidden';
            this.textAreaEl.style.height = '';
            this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
        }
    }
}
