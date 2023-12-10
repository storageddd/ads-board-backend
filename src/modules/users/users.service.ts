import { User, UserRole } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { type UserJWT } from '~/types';
import { PrismaService } from '~/services/prisma.service';
import { hashPassword } from '~/utils/hashPassword';
import { canUpdateOrDeleteEntity } from '~/utils/canUpdateOrDeleteEntity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userDefaultSelect } from './users.constants';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        role: UserRole.PARTICIPANT,
      },
    });
  }

  findAll(limit?: number, offset?: number): Promise<Partial<User>[]> {
    return this.prismaService.user.findMany({
      select: userDefaultSelect,
      skip: offset || undefined,
      take: limit || undefined,
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number): Promise<Partial<User> | null> {
    return this.prismaService.user.findUnique({
      select: userDefaultSelect,
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    userJwt: UserJWT,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (!canUpdateOrDeleteEntity(user.id, userJwt)) {
      throw new ForbiddenException();
    }

    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: number, userJwt: UserJWT): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (!canUpdateOrDeleteEntity(user.id, userJwt)) {
      throw new ForbiddenException();
    }

    return await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
