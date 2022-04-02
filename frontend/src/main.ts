import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Chart, registerables } from 'chart.js';

/**
 * Chart.js is ESM tree shakeable and requires to register all used components
 * This line in fact registers all ChartJS components...
 * @see {@link https://github.com/sgratzl/chartjs-chart-wordcloud/issues/4}
 */
Chart.register(...registerables);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
