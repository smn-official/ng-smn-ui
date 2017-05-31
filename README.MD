# ng-smn-ui

## Installation

To install this library, run:

![npm install](https://media.giphy.com/media/3o7bujlOTUe0SXB3lm/giphy.gif)
```bash
$ npm install ng-smn-ui --save

$ npm install @angular/animations
```

and then from your Angular `AppModule`:

![import module](https://media.giphy.com/media/3ohzdETreGQfzK7W8w/giphy.gif)

```javascript
import { BrowserModule } from '@angular/platform-browser';
// Import CUSTOM_ELEMENTS_SCHEMA
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { SMNUIModule } from 'ng-smn-ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    SMNUIModule
    //
    LibraryModule
  ],
  // Add schemas
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
and then from your Angular `angular-cli.json`:

![import style](https://media.giphy.com/media/xUPGcrZU9oe6HE90M8/giphy.gif)


```javascript

"styles": [
  "styles.scss",
  //Import style here
  "../node_modules/ng-smn-ui/style.min.scss"
],

```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

![ng serve](https://media.giphy.com/media/3ohzdEzjq3a8mCJmPm/giphy.gif)

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>

<ui-input-container>
  <input type="text">
  <label>SMN-UI</label>
</ui-input-container>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [keven](mailto:keven@smn.com.br)
