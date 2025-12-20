export interface GraphicData {
  xAxis: number;
  yAxis: number;
}

export interface UserName {
  name: string;
}

export type GraphicResponse = GraphicData | UserName;
