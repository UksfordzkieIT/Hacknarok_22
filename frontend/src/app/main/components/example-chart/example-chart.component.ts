import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { EventBusService } from '../../../services/event-bus.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-example-chart',
  templateUrl: './example-chart.component.html',
  styleUrls: ['./example-chart.component.scss'],
})
export class ExampleChartComponent implements AfterViewInit, OnDestroy {
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
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
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

  constructor(public eventBus: EventBusService) {
    this.themeModeChangedSubscription = eventBus.modeSubject$.subscribe((val) =>
      this.themeModeChange(val)
    );
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
