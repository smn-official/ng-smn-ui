import {ApplicationRef, enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableDebugTools } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule);

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(moduleRef => {
        if (!environment.production) {
            const applicationRef = moduleRef.injector.get(ApplicationRef);
            const componentRef = applicationRef.components[0];
            // permite usar `ng.profiler.timeChangeDetection();` para testar o desempenho da
            // aplicação - somente no environment.desenv
            enableDebugTools(componentRef);
        }
    })
    .catch(err => console.log(err));

