import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import HeatMap from 'heatmap-ts';

@Component({
  selector: 'app-example-heatmap',
  templateUrl: './example-heatmap.component.html',
  styleUrls: ['./example-heatmap.component.scss'],
})
export class ExampleHeatmapComponent implements AfterViewInit {
  @ViewChild('testHeatMapDiv') testHeatMapDiv!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    const heatMap = new HeatMap({
      container: this.testHeatMapDiv.nativeElement,
      maxOpacity: 0.6,
      radius: 50,
      blur: 0.9,
      width: 256,
      height: 256,
    });
    this.generateExampleHeatMap(heatMap);
  }

  generateExampleHeatMap(heatMap: HeatMap): void {
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
}
