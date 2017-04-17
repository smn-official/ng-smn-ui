import { Component, OnInit, Attribute, Input } from '@angular/core';

@Component({
    selector: 'ui-profile-float',
    exportAs: "ui-profile-float",
    template: require('./profile-float.component.html'),
    styles: [require('./profile-float.component.scss')]
})
export class ProfileFloatComponent implements OnInit {
    private src = "";
    private higherWidth = "";

    //Geramos um id único
    private id = 'imagem_' + (Math.floor((Math.random() * 100000) + 1));
    constructor( @Attribute('higherWidth') higherWidth: any, @Attribute('src') src: any, @Attribute('nosrc') nosrc: any, @Attribute('help') help: string) {
        if (help != null) {
            console.info(`########################################################################
            \n(SMNUI4) Ajuda [ui-profile-float]
            \nAtributos disponíveis: 
            \n(nosrc?) - Caso a imagem primária não for encontrada será exibida a desse parametro.
            \n(src) - Imagem primária do componente.
            \n(higherWidth?) - Largura máxima da imagem.
            \nConsulte a documentação detalhada em: http://smnui.smn.com.br
            \n########################################################################`);
        }

        this.src = src;

        //Esse método é o equivalente ao document ready do Jquery
        document.addEventListener('DOMContentLoaded', () => {
            this.higherWidth = higherWidth;
            var img = document.getElementById(this.id);
            img.onerror = () => {
                this.src = nosrc || "http://vignette2.wikia.nocookie.net/illogicopedia/images/6/61/Crystal_128_error.png/revision/latest?cb=20070825112150";
            }
        }, false);
    }

    ngOnInit() {
    }

}
