import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'ui-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit, AfterViewChecked {

    contentHeight: number;
    state = false;
    label: string;
    description: string;
    element: any;

    @Input() disabled: boolean;
    @ViewChild('painelBody') painelBody: ElementRef;

    constructor(
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
        let elements: Array<HTMLElement>;
        this.element = this.elementRef.nativeElement;
        this.contentHeight = this.painelBody.nativeElement.clientHeight;

        // Carrega o label e remove possiveis redundancias
        elements = Array.from(this.element.querySelectorAll('ui-expansion-panel-label'));
        if (elements.length) {
            this.label = elements[0].innerText;
            elements.forEach((item: HTMLElement) => item.remove());
        }


        // Carrega o label e remove possiveis redundancias
        elements = Array.from(this.element.querySelectorAll('ui-expansion-panel-description'));
        if (elements.length) {
            this.description = this.element.querySelector('ui-expansion-panel-description').innerText;
            elements.forEach((item: HTMLElement) => item.remove());
        }
    }

    ngAfterViewChecked() {
        this.contentHeight = this.painelBody.nativeElement.clientHeight;
    }

    toggle() {
        if (!this.disabled) {
            this.state = !this.state;
        }
    }

}
