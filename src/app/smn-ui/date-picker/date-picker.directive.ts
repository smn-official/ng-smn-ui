import {Directive, EventEmitter, Input, Output, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {UiReferencesService} from './references.service';
import {Subject} from 'rxjs/Subject';
import {isDate} from "rxjs/util/isDate";

@Directive({
    selector: '[uiDatePicker]'
})
export class UiDatePickerDirective implements OnInit, OnChanges, OnDestroy {
    @Input() ngModel;
    @Input() maxDate: Date;
    @Input() minDate: Date;
    @Input() initOnSelected: Date;
    @Input() confirmSelection: boolean;
    @Input('theme-class') themeClass: string;
    @Input('uiDatePicker') datePicker: string;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    chosen: Subject<any> = new Subject();

    constructor(public referencesService: UiReferencesService) {
        this.minDate = this.minDate && isDate(new Date(this.minDate)) ? new Date(this.minDate) : this.minDate;
        this.maxDate = this.maxDate && isDate(new Date(this.maxDate)) ? new Date(this.maxDate) : this.maxDate;
    }

    ngOnInit() {
        this.referencesService.add(this.datePicker, this);
    }

    ngOnChanges(value) {
        this.chosen.next(value);
    }

    ngOnDestroy() {
        this.referencesService.remove(this.datePicker);
    }
}
