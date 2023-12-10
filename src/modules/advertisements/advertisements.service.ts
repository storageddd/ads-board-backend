import { type Advertisement } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '~/services/prisma.service';
import { canUpdateOrDeleteEntity } from '~/utils/canUpdateOrDeleteEntity';
import { advertisementDefaultSelect } from './advertisements.constants';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { UserJWT } from '~/types';

@Injectable()
export class AdvertisementsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createAdvertisementDto: CreateAdvertisementDto,
    userId: number,
  ): Promise<Advertisement> {
    return this.prismaService.advertisement.create({
      data: {
        ...createAdvertisementDto,
        userId,
      },
    });
  }

  findAll(limit?: number, offset?: number): Promise<Partial<Advertisement>[]> {
    return this.prismaService.advertisement.findMany({
      select: advertisementDefaultSelect,
      skip: offset || undefined,
      take: limit || undefined,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Partial<Advertisement> | null> {
    const advertisement = await this.prismaService.advertisement.findUnique({
      select: advertisementDefaultSelect,
      where: {
        id,
      },
    });

    if (!advertisement) {
      throw new NotFoundException();
    }

    return advertisement;
  }

  async update(
    id: number,
    updateAdvertisementDto: UpdateAdvertisementDto,
    userJwt: UserJWT,
  ): Promise<Advertisement> {
    const advertisement = await this.prismaService.advertisement.findUnique({
      where: {
        id,
      },
    });

    if (!advertisement) {
      throw new NotFoundException();
    }

    if (!canUpdateOrDeleteEntity(advertisement.userId, userJwt)) {
      throw new ForbiddenException();
    }

    return await this.prismaService.advertisement.update({
      where: {
        id,
      },
      data: {
        ...updateAdvertisementDto,
      },
    });
  }

  async remove(id: number, userJwt: UserJWT): Promise<Advertisement> {
    const advertisement = await this.prismaService.advertisement.findUnique({
      where: {
        id,
      },
    });

    if (!advertisement) {
      throw new NotFoundException();
    }

    if (!canUpdateOrDeleteEntity(advertisement.userId, userJwt)) {
      throw new ForbiddenException();
    }

    return this.prismaService.advertisement.delete({
      where: {
        id,
      },
    });
  }
}
