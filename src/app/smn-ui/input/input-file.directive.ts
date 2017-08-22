import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

@Directive({
    selector: '[uiInputFile]'
})
export class UiInputFileDirective {

    @Input() files: any;
    @Input() model: any;
    @Input() accept: string;
    @Input() read: Function;
    @Input() error: Function;
    @Input() fileChange: Function;
    @Input('max-size') maxSize: string;
    @Input('max-file-size') maxFileSize: string;
    @Output() filesChange: EventEmitter<any> = new EventEmitter();
    @Output() modelChange: EventEmitter<any> = new EventEmitter();


    constructor(public element: ElementRef, public ngControl: NgControl) {
    }

    @HostListener('change', ['$event'])
    onChange(e) {
        e.stopPropagation();
        e.preventDefault();

        this.ngControl.control.markAsDirty();
        this.ngControl.control.setErrors(null);

        this.model = [];
        const files = e.target.files;
        const accepts = this.accept ? this.accept.split(',') : [];
        const maxSize = this.maxSize ? this.toByte(this.maxSize) : null;
        const maxFileSize = this.maxFileSize ? this.toByte(this.maxFileSize) : null;

        let sum = 0;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            sum += file.size;

            const validMaxFileSize = this.validateMaxSize(file.size, maxFileSize);
            const validMaxSize = this.validateMaxSize(sum, maxSize);
            const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
            const validType = this.validateType(file, fileExtension, accepts);

            if (validMaxFileSize) {
                this.ngControl.control.setErrors(Object.assign(this.ngControl.errors || {}, {maxFileSize: true}));
            }

            if (!validType) {
                this.ngControl.control.setErrors(Object.assign(this.ngControl.errors || {}, {accept: true}));
            }

            if (this.validateMaxSize(sum, maxSize)) {
                this.ngControl.control.setErrors(Object.assign(this.ngControl.errors || {}, {maxSize: true}));
            }

            if (validType && !validMaxFileSize && !validMaxSize) {
                this.model.push({});
                this.modelChange.emit(this.model);
                this.readFile(file, this.model[i], i);
            } else if (this.error) {
                this.error(file, {
                    type: !validType,
                    maxSize: validMaxSize,
                    maxFileSize: validMaxFileSize
                }, i);
            }
        }

        this.files = e.target.files;
        this.filesChange.emit(this.files);

        if (this.fileChange) {
            this.fileChange(this.files, this.ngControl.control.invalid);
        }
    }

    validateType(file, extension, accepts): boolean {
        if (!accepts.length) {
            return true;
        }

        for (let j = 0; j < accepts.length; j++) {
            const accept = accepts[j].trim();
            const regex = accept.match(/^[^\*]*\*$/) ? new RegExp('^' + accept) : new RegExp('^' + accept + '$');

            if (file.type.match(regex) || extension.match(regex)) {
                return true;
            }
        }

        return false;
    }

    validateMaxSize(size, maxSize): boolean {
        return ( maxSize && size > maxSize);
    }

    toByte(sizeString: string) {
        sizeString = sizeString.toString();
        const unitMatch = sizeString.match(/[a-zA-Z]+/g);
        const unit = unitMatch ? unitMatch[0] : null;
        const sizeMatch = sizeString.match(/\d+/);
        const unitSize = sizeMatch ? parseInt(sizeMatch[0], 10) : null;
        let size = unitSize;

        switch (unit) {
            case 'KB':
                size = unitSize * 1024;
                break;
            case 'MB':
                size = unitSize * Math.pow(1024, 2);
                break;
            case 'GB':
                size = unitSize * Math.pow(1024, 3);
                break;
            case 'TB':
                size = unitSize * Math.pow(1024, 4);
                break;
            case 'PB':
                size = unitSize * Math.pow(1024, 5);
                break;
            case 'EB':
                size = unitSize * Math.pow(1024, 6);
                break;
            case 'ZB':
                size = unitSize * Math.pow(1024, 7);
                break;
            case 'YB':
                size = unitSize * Math.pow(1024, 8);
                break;
        }
        return size;
    }

    readFile(file, data, index) {
        const reader = new FileReader();
        data.resolved = 'false';

        reader.onload = (e: any) => {
            data.result = e.target.result;
            data.resolved = true;
            this.modelChange.emit(this.model);
            this.read(file, data.result, index);
        };

        reader.onerror = (e: any) => {
            data.error = e.target.error;
            this.modelChange.emit(this.model);
        };

        reader.onprogress = (e: any) => {
            data.progress = {
                loaded: e.loaded,
                total: e.total,
                percent: Math.round((e.loaded / e.total) * 100)
            };
            this.modelChange.emit(this.model);
        };

        reader.readAsDataURL(file);
    }
}
