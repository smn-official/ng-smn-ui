import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: '[uiInputFile]'
})
export class UiInputFileDirective {

    @Input() files: any;
    @Input() accept: any;
    @Input('max-size') maxSize: any;
    @Input('max-file-size') maxFileSize: any;
    @Input() readDataUrl: any;
    @Input() error: any;
    @Input() fileChange: any;
    @Output() read: EventEmitter<any> = new EventEmitter();
    @Output() filesChange: EventEmitter<any> = new EventEmitter();


    constructor(public element: ElementRef) {
        this.accept = this.accept || ''
    }

    @HostListener('change', ['$event']) onChange(e) {

        e.stopPropagation();
        e.preventDefault();

        const files = e.target.files;
        this.readDataUrl = this.readDataUrl && files.length ? [] : null;
        // ctrl.$setDirty();
        // ctrl.$setValidity('uiMaxSize', true);
        // ctrl.$setValidity('uiMaxFileSize', true);
        // ctrl.$setValidity('uiAccept', true);

        // Verificação de tamanho
        const maxSize = this.maxSize ? this.toByte(this.maxSize) : null;
        const maxFileSize = this.maxFileSize ? this.toByte(this.maxFileSize) : null;
        const accepts = this.accept.split(',');

        let sum = 0;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let validMaxFileSize = maxFileSize && file.size > maxFileSize;
            let validMaxSize = maxSize && sum > maxSize;
            let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);

            if (validMaxFileSize) {
                // ctrl.$setValidity('uiMaxFileSize', false);
            }

            sum += file.size;

            // Verificar MIME Types
            let validType = false;
            for (let j = 0; j < accepts.length; j++) {
                let accept = accepts[j].trim();
                // Checa se tem apenas um asterisco e se ele está no final
                let regex = accept.match(/^[^\*]*\*$/) ? new RegExp('^' + accept) : new RegExp('^' + accept + '$');
                if (file.type.match(regex) || fileExtension.match(regex)) {
                    validType = true;
                    break;
                }
            }
            if (!validType) {
                //ctrl.$setValidity('uiAccept', false);
            }

            if (maxSize && sum > maxSize) {
                // ctrl.$setValidity('uiMaxSize', false);
            }

            if (validType && !validMaxFileSize && !validMaxSize) {
                this.readDataUrl.push({});
                this.readFile(file, this.readDataUrl[i], i);
            }
            else if (this.error) {
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
            this.fileChange({ '$files': this.files});
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
        let reader = new FileReader();
        data.resolved = 'false';

        reader.onload = e => {
            // data.result = e.target.result;
            data.resolved = true;
            this.read.emit({ $data: data.result, $index: index, $file: file })
        };

        reader.onerror = e => {
            // data.error = e.target.error;
        };

        reader.onprogress = e => {
            if (!e.lengthComputable)
                return;
            data.progress = {
                loaded: e.loaded,
                total: e.total,
                percent: Math.round((e.loaded/e.total) * 100)
            }
        };

        reader.readAsDataURL(file);
    }
}
