import { Category } from '@prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '~/services/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categoryDefaultSelect } from './categories.constants';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.prismaService.category.findUnique({
      where: {
        title: createCategoryDto.title,
      },
    });

    if (category) {
      throw new BadRequestException('Category title must be unique');
    }

    return this.prismaService.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  findAll(): Promise<Category[]> {
    return this.prismaService.category.findMany({
      select: categoryDefaultSelect,
      orderBy: {
        title: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Category | null> {
    const category = await this.prismaService.category.findUnique({
      select: categoryDefaultSelect,
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(id: number): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
