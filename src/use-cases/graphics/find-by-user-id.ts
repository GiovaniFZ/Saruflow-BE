import { GraphicsRepository } from '../../../repositories/graphics-repository';
import { Graphic } from '../../generated/prisma';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface FindByUserIdRequest {
  userId: string;
}

interface FindByUserIdResponse {
  graphic: Graphic[];
}

export class FindByUserIdUseCase {
  constructor(private graphicsRepository: GraphicsRepository) {}
  async execute({
    userId,
  }: FindByUserIdRequest): Promise<FindByUserIdResponse> {
    const graphic = await this.graphicsRepository.findGraphicByUserId(userId);
    if (!graphic) {
      throw new ResourceNotFoundError();
    }
    return { graphic };
  }
}
