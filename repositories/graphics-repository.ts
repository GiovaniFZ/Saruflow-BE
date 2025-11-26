import { Graphic } from '../src/generated/prisma';

export interface GraphicsRepository {
  findGraphicByUserId(userId: string): Promise<Graphic[]>;
}
