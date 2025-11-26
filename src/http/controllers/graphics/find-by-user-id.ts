import { Request, Response } from 'express';
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found';
import { extractToken } from '../../../utils/extract-token';
import { PrismaGraphicsRepository } from '../../../../repositories/prisma';
import { FindByUserIdUseCase } from '../../../use-cases/graphics/find-by-user-id';

export async function findGraphicByUserId(req: Request, res: Response) {
  try {
    const prismaGraphicsRepository = new PrismaGraphicsRepository();
    const token = req.headers.authorization;
    if (!token) {
      throw new ResourceNotFoundError();
    }
    const { id } = extractToken(req);
    const findByIdUseCase = new FindByUserIdUseCase(prismaGraphicsRepository);
    const graphic = await findByIdUseCase.execute({ userId: id });
    return res.status(200).json(graphic);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).send(error);
  }
}
