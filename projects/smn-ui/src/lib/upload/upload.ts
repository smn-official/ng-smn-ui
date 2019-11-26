import { EventEmitter, Output, ViewChild } from '@angular/core';
import { UiSnackbar } from '../smn-ui.module';


export abstract class Upload {
    max: number;
    maxLength: number;
    ngModel: any;
    modelConfig: any;
    accept: string;
    maxFileSize: string;

    @Output() ngModelChange: EventEmitter<any>;
    @Output() remove: EventEmitter<any>;

    readFile(file, base64) {
        if (this.max && this.ngModel.length === this.max) {
            return;
        }

        if (this.maxLength && file.name.length > this.maxLength) {
            UiSnackbar.show({
                text: `Arquivo "${file.name}" não pode ultrapassar ${this.maxLength} caracteres.`
            });
            return;
        }

        const modelFile: any = {};
        let isDuplicated: boolean = false;
        modelFile[this.modelConfig.name] = file.name;
        modelFile[this.modelConfig.base64] = base64;

        this.ngModel.forEach((file) => {
            if (modelFile.name === file.name) {
                isDuplicated = true;
                UiSnackbar.show({
                    text: `Já existe o arquivo "${file.name}".`
                });
                return;
            }
        });
        if (isDuplicated) {
            return;
        }
        this.ngModel.push(modelFile);
        this.ngModelChange.emit(this.ngModel);


    }

    errorFile(file, error) {
        if (error.type) {
            const accept = this.accept.toUpperCase().split(',');
            UiSnackbar.hide();
            UiSnackbar.show({
                text: 'Você pode selecionar apenas arquivo' + (accept.length == 1
                    ? ` do tipo ${accept[0]}`
                    : `s dos tipos ${accept.join(', ')}`) + '.'
            });
        }
        if (error.maxFileSize) {
            UiSnackbar.hide();
            UiSnackbar.show({
                text: `Use arquivos menores que ${this.maxFileSize}.`
            });
        }
    }

    removeFile(file, index) {
        this.ngModel.splice(index, 1);
        this.ngModelChange.emit(this.ngModel);
        this.remove.emit({file, index});
    }

    filesChange(files) {
        if (this.max && (this.ngModel.length + files.length) > this.max) {
            UiSnackbar.hide();
            UiSnackbar.show({
                text: `Você pode selecionar apenas ${this.max} arquivo${this.max > 1 ? 's' : ''}.`
            });
        }
    }

    getFileName(file) {
        return file[this.modelConfig.name];
    }
}
