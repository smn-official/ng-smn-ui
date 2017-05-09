import { Directive, Attribute, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[ui-perceptive]'
})
export class PerceptiveDirective {

    // @param perceptive [Hex, porcentagem?]
    // Caso informado dois oaramêtros [isBright]
    constructor( @Attribute('ui-perceptive') perceptive: any,
        @Attribute('primarycolor') primarycolor: string,
        @Attribute('secondarycolor') secondarycolor: string,
        @Attribute('backcolor') backcolor: string,
        @Attribute('help') help: string,
        private el: ElementRef, private render: Renderer) {
        if (help != null) {
            console.info(`########################################################################
            \n(SMNUI4) Ajuda [ui-perceptive]
            \nAtributos disponíveis: 
            \n(ui-perceptive): color[hexadecimal], float - Cor do background [Comparação] | Porcentagem
            \n(primarycolor): color[name] - Cor primária
            \n(secondarycolor): color[name] - Cor secundária
            \n(backcolor): boolean - Usar somente em caso de preenchimento de divs
            \nConsulte a documentação detalhada em: http://smnui.smn.com.br
            \n########################################################################`);
        }
        if (perceptive == null) {
            console.error('(SMNUI4) Erro na quantidade de atributos - (Defina Hexadecimal, porcentagem [Opcional]) [Diretiva Perceptive]');
            return;
        }
        let split = perceptive.split(',');
        if ((split.length !== 2 && split.length !== 1)) {
            console.error(`(SMNUI4) Erro na quantidade de atributos - (Defina Hexadecimal, porcentagem [Opcional]) (${split.length}) [Diretiva Perceptive]`);
            return;
        }
        this.render.setElementStyle(this.el.nativeElement, 'color', this.getColor(split[0], split[1], secondarycolor, primarycolor));
        if (backcolor)
            this.render.setElementStyle(this.el.nativeElement, 'background-color', split[0]);
    }

    private getColor(hex: any, minDarkPerc: any, primarycolor: string, secondarycolor: string): string {
        return this.isBright(hex, minDarkPerc) ? (primarycolor || 'black') : (secondarycolor || 'white');
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
