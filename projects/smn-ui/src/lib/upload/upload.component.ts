import { Component, OnInit, OnChanges, Input, forwardRef, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { Upload } from './upload';
import { enterLeaveViewAnimation } from './enter-leave-view.animations';


@Component({
    selector: 'ui-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UiUploadComponent),
        multi: true
    }],
    animations: [enterLeaveViewAnimation]
})
export class UiUploadComponent extends Upload implements OnInit, OnChanges {

    @ViewChild('inputFileRef', {static: false}) inputFileRef;

    @Input() ngModel: any;
    @Input() modelConfig: any;
    @Input() accept: string;
    @Input() message: string;
    @Input() max: number;
    @Input() maxLength: number;
    @Input() maxSize: string;
    @Input() maxFileSize: string;
    @Input() multiple: boolean;

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() remove: EventEmitter<any> = new EventEmitter<any>();

    model: any;
    isDragging: boolean;

    constructor() {
        super();
        this.readFile = this.readFile.bind(this);
        this.errorFile = this.errorFile.bind(this);
    }

    ngOnInit() {
        this.modelConfig = {
            name: 'name',
            base64: 'base64',
            ...this.modelConfig
        };
    }

    ngOnChanges(changes) {
        if (changes.ngModel) {
            this.ngModel = changes.ngModel.currentValue && Array.isArray(changes.ngModel.currentValue) ? changes.ngModel.currentValue : [];
        }

        if (changes.modelConfig) {
            this.modelConfig = {
                name: 'name',
                base64: 'base64',
                ...changes.modelConfig.currentValue
            };
        }
    }

    writeValue(rawValue: any): void {
    }

    renderViaInput(rawValue: any): void {
    }

    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        event.stopPropagation();
        event.preventDefault();
        this.isDragging = true;
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        this.isDragging = true;
        event.dataTransfer.dropEffect = 'copy';
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        event.stopPropagation();
        event.preventDefault();
        this.isDragging = false;
    }

    @HostListener('drop', ['$event']) onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        const {files} = event.dataTransfer;
        this.inputFileRef.readFiles(files);
    }
}
