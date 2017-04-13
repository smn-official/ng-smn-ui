import { Directive, Attribute, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[appColor]'
})
export class ColorDirective {

    // @param appColor [Hex, porcentagem?]
    // Caso informado um paramêtro [hexToRgb]
    // Caso informado dois oaramêtros [isBright]
    constructor( @Attribute('appColor') appColor: any, private el: ElementRef, private render: Renderer) {
        if (appColor == null) {
            console.error('(SMNUI4) Erro na quantidade de atributos - [Diretiva appColor]');
            return;
        }
        let split = appColor.split(',');
        if (appColor == null || split.length !== 2) {
            console.error('(SMNUI4) Erro na quantidade de atributos - [Diretiva appColor]');
            return;
        }
        if (split[1] == null) {
            this.render.setElementStyle(this.el.nativeElement, 'color', this.hexToRgb(split[0]));
            return;
        }
        this.render.setElementStyle(this.el.nativeElement, 'color', this.isBright(split[0], split[1]));
    }

    private isBright(hex: any, minDarkPerc: any): any {
        let color = this.hexToRgb(hex);
        if (!color) {
            return false;
        }
        // Contando a luminosidade perceptiva
        // O olho humano favorece a cor verde
        let luminosityPerc = 1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
        return (luminosityPerc < (minDarkPerc || 0.3));
    }

    private hexToRgb(hex: any): any {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result == null ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}
