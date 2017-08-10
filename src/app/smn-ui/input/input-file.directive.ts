import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output} from '@angular/core';
import {FormControl, NgControl} from '@angular/forms';

@Directive({
    selector: '[uiInputFile]',
    // providers: [
    //     { provide: FormControl, useExisting: forwardRef(() => UiInputFileDirective), multi: true }
    // ]
})
export class UiInputFileDirective {

    @Input() files: any;
    @Input() model: any;
    @Input() accept: any;
    @Input('max-size') maxSize: any;
    @Input('max-file-size') maxFileSize: any;
    @Input('read-data-url') readDataUrl: any;
    @Input() error: any;
    @Input() fileChange: any;
    @Output() read: EventEmitter<any> = new EventEmitter();
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

        const files = e.target.files;
        this.model = [];

        const accepts = this.accept ? this.accept.split(',') : [];
        const maxSize = this.maxSize ? this.toByte(this.maxSize) : null;
        const maxFileSize = this.maxFileSize ? this.toByte(this.maxFileSize) : null;

        let sum = 0;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            sum += file.size;

            const validMaxFileSize = maxFileSize && file.size > maxFileSize;
            const validMaxSize = maxSize && sum > maxSize;
            const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);

            console.log(validMaxSize)
            if (validMaxFileSize) {
                this.ngControl.control.setErrors(Object.assign(this.ngControl.errors || {}, { maxFileSize: true }));
            }


            // Verificar MIME Types
            let validType = !accepts.length;

            for (let j = 0; j < accepts.length; j++) {
                const accept = accepts[j].trim();
                // Checa se tem apenas um asterisco e se ele está no final
                const regex = accept.match(/^[^\*]*\*$/) ? new RegExp('^' + accept) : new RegExp('^' + accept + '$');
                console.log(file.type.match(regex), fileExtension.match(regex))
                if (file.type.match(regex) || fileExtension.match(regex)) {
                    validType = true;
                    break;
                }
            }

            if (!validType) {
                this.ngControl.control.setErrors(Object.assign(this.ngControl.errors || {}, { accept: true }));
            }

            console.log(sum , maxSize)
            if (maxSize && sum > maxSize) {
                this.ngControl.control.setErrors(Object.assign(this.ngControl.errors || {}, { maxSize: true }));
            }

            console.log(validType && !validMaxFileSize && !validMaxSize)

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
            this.fileChange({'$files': this.files});
        }
        // this.fileChange({ '$files': this.files, '$error': ctrl.$invalid ? ctrl.$error : null });
    }

    toByte(sizeString) {
        sizeString = sizeString.toString();
        var unitMatch = sizeString.match(/[a-zA-Z]+/g),
            unit = unitMatch ? unitMatch[0] : null,
            sizeMatch = sizeString.match(/\d+/),
            unitSize = sizeMatch ? parseInt(sizeMatch[0]) : null,
            size = unitSize;
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
            // this.read.emit({ $data: data.result, $index: index, $file: file })
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
