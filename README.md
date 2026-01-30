# SMN UI

SMN UI é um framework de componentes escritos em [Angular](https://angular.io/). Todo o design é baseado nas guidelines do [Material Design](https://material.io/guidelines/)

### Instalação

Instalando as depências do SMN UI

```shell
$ npm install ng-smn-ui --save
```

Agora importe o SMN UI e o CUSTOM_ELEMENTS_SCHEMA ao seu módulo principal.

```js
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import SMNUIModule from 'ng-smn-ui';

@NgModule({
    declarations: [],
    imports: [
        SMNUIModule
    ]
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
});
```

##### Definindo nosso tema
No arquivo styles.scss insira o seguinte código
```scss
@import "~ng-smn-ui/lib/core/core";
@import "~ng-smn-ui/lib/core/theme";

$primary: (color: 'blue', hue: '500');
$accent: (color: 'green', hue: '50');

/**
  * O parâmetro passado como "false" significa que queremos um tema light
  * Basta trocar esse parâmetro para "true" e teremos um tema dark 
**/
$theme: ui-theme($primary, $accent, false); 

@include ui-core();

@include ui-build-theme($theme);
```
**NOTE: As cores disponíveis podem ser consultados na paleta de cores do [Material Design](https://material.io/guidelines/style/color.html#color-color-palette)**

Agora só temos que injetar as fontes na nossa "index.html"

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,400,400italic,500,500italic,700,700italic" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

Pronto! Agora podemos usar todos os recursos oferecidos pelo SMN UI. 
Todos os recursos estarão disponíveis em breve na nossa [DOC]()

License
----

MIT

---

### Publish

Após desenvolver novas features ou correções, é preciso:

- Subir a versão do package no [package.json](./package.json#L3)
- Rodar o comando `npm run build`
- Criar um token na conta da `smn-official-org` com permissões de escrita e com opção de bypass 2FA
  - Na sua máquina, crie/edite a variável de ambiente `NPM_TOKEN` com o novo token criado
  - Na root do projeto, crie o arquivo `.npmrc` com o conteúdo `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`
- Por fim, executar o comando `npm publish dist/lib`

---


**Feito com ❤️ pelos Devs da [SMN](http://smn.com.br/)**
