import { GraphicResponse } from '../interfaces/interfaces';
import { Prisma, User } from '../src/generated/prisma';
import { prisma } from '../src/lib/prisma';
import { GraphicsRepository } from './graphics-repository';
import { UsersRepository } from './users-repository';

export class PrismaUsersRepository implements UsersRepository {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
  async findMany() {
    const users = await prisma.user.findMany();
    return users;
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }
}

export class PrismaGraphicsRepository implements GraphicsRepository {
  async findGraphicByUserId(userId: string): Promise<GraphicResponse[]> {
    const graphic: GraphicResponse[] = await prisma.graphic.findMany({
      where: { userId },
      select: { xAxis: true, yAxis: true },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });
    if (user) {
      graphic.push({ name: user?.name });
    }
    return graphic;
  }
}
