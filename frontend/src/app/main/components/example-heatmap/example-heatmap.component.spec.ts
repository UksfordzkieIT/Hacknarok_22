import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleHeatmapComponent } from './example-heatmap.component';

describe('ExampleHeatmapComponent', () => {
  let component: ExampleHeatmapComponent;
  let fixture: ComponentFixture<ExampleHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
