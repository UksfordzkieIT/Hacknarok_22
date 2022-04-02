import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import HeatMap from 'heatmap-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('testChartCanvas') testChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('testHeatMapDiv') testHeatMapDiv!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const ctx = this.testChartCanvas.nativeElement.getContext('2d');
    if (ctx) this.generateExampleChart(ctx);

    const heatMap = new HeatMap({
      container: this.testHeatMapDiv.nativeElement,
      maxOpacity: 0.6,
      radius: 50,
      blur: 0.9,
      width: 300,
      height: 300,
    });
    this.generateExampleHeatMap(heatMap);
  }

  generateExampleHeatMap(heatMap: HeatMap): void {
    // screw 'vars' for now...
    const points = [];
    let max = 0;
    const width = 840;
    const height = 400;
    let len = 200;

    while (len--) {
      const val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      const point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val,
      };
      points.push(point);
    }

    const data = {
      max: max,
      data: points,
    };

    heatMap.setData(data);
  }

  generateExampleChart(ctx: CanvasRenderingContext2D): void {
    new Chart(ctx, {
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
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
