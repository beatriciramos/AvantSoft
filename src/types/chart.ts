export interface BarChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

export interface PieChartData {
  name: string;
  sales: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}
