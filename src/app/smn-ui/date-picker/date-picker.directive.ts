import {Directive, EventEmitter, Input, Output, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {UiReferencesService} from './references.service';
import {Subject} from 'rxjs/Subject';

@Directive({
    selector: '[uiDatePicker]'
})
export class UiDatePickerDirective implements OnInit, OnChanges, OnDestroy {
    @Input() ngModel;
    @Input() maxDate: Date;
    @Input() minDate: Date;
    @Input() initOnSelected: Date;
    @Input() confirmSelection: boolean;
    @Input() darkClass: string;
    @Input('uiDatePicker') datePicker: string;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    chosen: Subject<any> = new Subject();

    constructor(public referencesService: UiReferencesService) {
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
