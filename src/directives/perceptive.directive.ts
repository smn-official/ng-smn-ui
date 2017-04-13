import { Directive, Attribute, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[perceptive]'
})
export class PerceptiveDirective {

    // @param perceptive [Hex, porcentagem?]
    // Caso informado dois oaramêtros [isBright]
    constructor( @Attribute('perceptive') perceptive: any,
        @Attribute('primarycolor') primarycolor: string,
        @Attribute('secondarycolor') secondarycolor: string,
        private el: ElementRef, private render: Renderer) {
        if (perceptive == null) {
            console.error('(SMNUI4) Erro na quantidade de atributos - (Defina Hexadecimal, porcentagem [Opcional]) [Diretiva Perceptive]');
            return;
        }
        let split = perceptive.split(',');
        if ((split.length !== 2 && split.length !== 1)) {
            console.error(`(SMNUI4) Erro na quantidade de atributos - (Defina Hexadecimal, porcentagem [Opcional]) (${split.length}) [Diretiva Perceptive]`);
            return;
        }
        console.log("COR:", this.getColor(split[0], split[1], primarycolor, secondarycolor));
        this.render.setElementStyle(this.el.nativeElement, 'color', this.getColor(split[0], split[1], primarycolor, secondarycolor));
    }

    private getColor(hex: any, minDarkPerc: any, primarycolor: string, secondarycolor: string): string {
        return this.isBright(hex, minDarkPerc) ? (primarycolor || 'white') : (secondarycolor || 'black');
    }
    private isBright(hex: any, minDarkPerc: any): any {
        let color = this.hexToRgb(hex);
        if (!color) {
            console.error('(SMNUI4) Cor inválida - [Diretiva perceptive]');
            return false;
        }
        // Contando a luminosidade perceptiva
        // O olho humano favorece a cor verde
        let luminosityPerc = 1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
        return (luminosityPerc < (minDarkPerc || 0.3));
    }

    private hexToRgb(hex: any): any {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}
