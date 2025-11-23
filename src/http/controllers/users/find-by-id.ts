import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../../../repositories/prisma';
import { FindUserByIdUseCase } from '../../../use-cases/users/find-by-id';
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found';
import { extractToken } from '../../../utils/extract-token';

export async function findById(req: Request, res: Response) {
  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const token = req.headers.authorization;
    if (!token) {
      throw new ResourceNotFoundError();
    }
    const { id } = extractToken(req);
    const findByIdUseCase = new FindUserByIdUseCase(prismaUsersRepository);
    const user = await findByIdUseCase.execute({ userId: id });
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).send(error);
  }
}
