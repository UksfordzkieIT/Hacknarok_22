import { StatStoreData } from '../models/models';

export default function statStoreToChartData(
  data: StatStoreData
): Record<string, unknown> {
  const datasetsObject = data.classes.map((values, index) => {
    return {
      data: data.values[index],
      label: data.classes[index],
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      fill: false,
    };
  });

  return {
    type: 'line',
    data: {
      labels: data.dates,
      datasets: datasetsObject,
    },
  };
}
