import {Directive, EventEmitter, Input, Output, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {UiTimePickerService} from './time-picker.service';
import {Subject} from 'rxjs/Subject';

@Directive({
    selector: '[uiTimePicker]'
})
export class UiTimePickerDirective implements OnInit, OnChanges, OnDestroy {
    @Input() ngModel;
    @Input() confirmSelection: boolean;
    @Input('theme-class') themeClass: string;
    @Input('uiTimePicker') timePicker: string;
    @Output() select: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    chosen: Subject<any> = new Subject();

    constructor(public timePickerService: UiTimePickerService) {
    }

    ngOnInit() {
        this.timePickerService.add(this.timePicker, this);
    }

    ngOnChanges(value) {
        this.chosen.next(value);
    }

    ngOnDestroy() {
        this.timePickerService.remove(this.timePicker);
    }
}
