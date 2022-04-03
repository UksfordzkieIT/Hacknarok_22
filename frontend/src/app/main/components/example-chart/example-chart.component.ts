import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { EventBusService } from '../../../services/event-bus.service';
import { Subscription } from 'rxjs';
import { CustomDateRange } from '../date-range/date-range.component';
import { StoreService } from '../../../services/store.service';
import { map } from 'rxjs/operators';
import statStoreToChartData from '../../../converters/stat-store-data-to-chart-data';

@Component({
  selector: 'app-example-chart',
  templateUrl: './example-chart.component.html',
  styleUrls: ['./example-chart.component.scss'],
})
export class ExampleChartComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input('for') for!: 'fabryka' | 'sklep';
  @Input('dateRange') dateRange!: CustomDateRange;
  @ViewChild('testChartCanvas') testChartCanvas!: ElementRef<HTMLCanvasElement>;
  themeModeChangedSubscription!: Subscription;
  canvasContext?: CanvasRenderingContext2D;
  chartInstance?: Chart;
  theme = 'light';

  readonly BACKGROUND_PLUGIN = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart: Chart): void => {
      const ctx = chart.canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#424242';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    },
  };

  CHART_CONFIG = {
    type: 'bar',
    data: {
      labels: ['Alkohol', 'Nabial', 'Slodycze', 'Napoje'],
      datasets: [
        {
          label: 'Dane',
          data: [123, 129, 233, 125],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: 'gray',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'gray',
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    plugins: [],
  };

  constructor(
    public eventBus: EventBusService,
    private storeService: StoreService
  ) {
    this.themeModeChangedSubscription = eventBus.modeSubject$.subscribe((val) =>
      this.themeModeChange(val)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateRange']) {
      this.storeService
        .getDataForChart(this.dateRange)
        .pipe(map((val) => statStoreToChartData(val)))
        .subscribe((val) => {
          // @ts-ignore
          this.CHART_CONFIG.data = val['data'];
          // @ts-ignore
          this.CHART_CONFIG.type = val['type'];
          this.chartInstance?.destroy();
          // @ts-ignore
          this.chartInstance = new Chart(this.canvasContext, this.CHART_CONFIG);
        });
    }
  }

  ngAfterViewInit(): void {
    this.canvasContext =
      this.testChartCanvas.nativeElement.getContext('2d') ?? undefined;
    if (this.canvasContext) {
      // @ts-ignore
      this.chartInstance = new Chart(this.canvasContext, this.CHART_CONFIG);
    }
  }

  themeModeChange(val: 'dark' | 'light'): void {
    if (this.canvasContext) {
      if (val === 'dark') {
        // @ts-ignore
        this.CHART_CONFIG.plugins.push(this.BACKGROUND_PLUGIN);
        this.CHART_CONFIG.options.scales.x.ticks.color = 'white';
        this.CHART_CONFIG.options.scales.y.ticks.color = 'white';
        this.chartInstance?.destroy();
        Chart.defaults.color = 'white';
        // @ts-ignore
        this.chartInstance = new Chart(this.canvasContext, this.CHART_CONFIG);
      } else {
        this.CHART_CONFIG.plugins = [];
        this.chartInstance?.destroy();
        Chart.defaults.color = '#424242';
        this.CHART_CONFIG.options.scales.x.ticks.color = '#424242';
        this.CHART_CONFIG.options.scales.y.ticks.color = '#424242';
        // @ts-ignore
        this.chartInstance = new Chart(this.canvasContext, this.CHART_CONFIG);
      }
    }
  }

  ngOnDestroy(): void {
    this.themeModeChangedSubscription.unsubscribe();
  }
}
