import { Directive, HostListener, HostBinding, EventEmitter, Output, Input } from '@angular/core';

@Directive({
    selector: '[uiDropAndDown]'
})
export class UiDropAndDownDirective {

    @Input() private files: any;
    @Input() private accept: string;
    @Input('max-size') private maxSize: string;
    @Input('max-file-size') private maxFileSize: string;
    @Output() private filesChange: EventEmitter<any> = new EventEmitter();
    @Output() private readFileEvent: EventEmitter<Object> = new EventEmitter();
    @HostBinding('style.background') private background = '#f5f5f5';

    constructor() { }

    @HostListener('drop', ['$event'])
    private onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        // Pega os dados do arquivo
        let files = evt.dataTransfer.files;
        this.background = '#f5f5f5';

        let reader;

        // Verifica se foi dropado algum arquivo
        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                reader = new FileReader();  // Cria um reader para ler o arquivo
                reader.file = files[i];
                reader.file.extension = reader.file.name.substring(reader.file.name.lastIndexOf('.') + 1).toLowerCase();
                reader.readAsDataURL(reader.file); // Cria o base64

                reader.onload = (e) => {
                    const obj = {
                        file: e.target.result,
                        item: reader.file,
                        index: i
                    };

                    this.readFileEvent.emit(obj);
                }

            }
        }
    }


    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5f5f5';
    }
}
