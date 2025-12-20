import { GraphicResponse } from '../interfaces/interfaces';
export interface GraphicsRepository {
  findGraphicByUserId(userId: string): Promise<GraphicResponse[]>;
}
