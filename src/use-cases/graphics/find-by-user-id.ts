import { GraphicsRepository } from '../../../repositories/graphics-repository';
import { GraphicResponse } from '../../../interfaces/interfaces';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface FindByUserIdRequest {
  userId: string;
}

interface FindByUserIdResponse {
  graphic: GraphicResponse[];
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
