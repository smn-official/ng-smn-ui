import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
    selector: 'ui-floating-card-container',
    exportAs: "ui-floating-card-container",
    template: require('./floating-card.component.html'),
    styles: [require('./floating-card.component.scss')]
})
export class FloatingCardComponent implements OnInit, OnDestroy {
    constructor(private ref: ElementRef) {
    }

    ngOnInit() {
        //Desativa o Scroll
        var html = document.getElementsByTagName("html")[0];
        html.style.overflow = 'hidden';
    }

    ngOnDestroy() {

    }

    private close() {
        //Ativa o Scroll
        var html = document.getElementsByTagName('html')[0];
        html.style.overflow = '';
        this.ref.nativeElement.querySelector('ui-floating-card').remove();
    }
}
