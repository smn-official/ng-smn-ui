# smn-ui-4

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
```

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

<!--after-->
npm install

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
