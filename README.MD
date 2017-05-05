<img src="https://david-dm.org/smn-official/smn-ui-4.svg" alt="Dependency Status">
<img src="https://david-dm.org/smn-official/smn-ui-4/dev-status.svg" alt="Dev Dependency Status">   

# SMN UI 4   
## What is SMN UI 4? 

![Logo](http://i.imgur.com/ivOg3Us.jpg "Exemplo UI")  
It´s not only a beautiful framework CSS for Angular 4 + based on Material Design.  
Contains too so many components, directives and more.  

### Code Example:
``` Example code to do this:  
<ui-page class="ui-flex center">
	<ui-translate-x>
		<ui-container class="flex-none">
			<img src="your logo here" alt="logo">
			<ui-card>
				<ui-card-title class="ui-title card dense">Efetue seu login</ui-card-title>
				<ui-card-content>
					<form (ngSubmit)="login(usuario)" #registerLogin="ngForm">
						<ui-input>
							<input ui-autofocus id="nome" [(ngModel)]="usuario.nome" type="text" name="nome" required>
							<label>Usuário</label>
						</ui-input>
						<ui-input>
							<input id="senha" [(ngModel)]="usuario.senha" type="password" name="senha" required>
							<label>Senha</label>
						</ui-input>
						<div class="ui-button-container">
							<button [disabled]="!usuario.nome || !usuario.senha" class="ui-button fill full primary raised">Conectar</button>
						</div>
					</form>
				</ui-card-content>
			</ui-card>
		</ui-container>
	</ui-translate-x>
</ui-page>
``` 

## Documentation

Work in progress...

## Development

To distribute the source use this following command:

```bash
$ npm run tsc
```

## Installation

To install this library, run:

```bash
$ npm install smn-ui-4 --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install smn-ui-4
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
//sAdd CUSTOM_ELEMENTS_SCHEMA
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SMNUI4Module } from 'smn-ui-4';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    LibraryModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

<!--package.json:-->
{
  "scripts": {
    ...
    "install": "typings install"
  }
...
  dependencies: {
...
    "typings": "^2.1.0",
...
  }
}

<!--typings.json:-->
{
  "globalDependencies": {
    "typings": "github:t4deon/FHIR-STU3-TS-Typings/typings.d.ts#e36b4cf4bb07734b97ea8d14893f7747fd990438"
  }
}

<!--src/tsconfig.app.json:-->
...
{
  "files": [
    "../typings/index.d.ts"
  ]
}
```

After: npm install

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<sampleComponent></sampleComponent>
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [keven silva](mailto:kevenx97ferreira@gmail.com)
