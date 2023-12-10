import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { Roles } from '~/decorators/roles.decorator';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({
    operationId: 'createCategory',
    description: 'Create new category (moderators only)',
  })
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    await this.categoriesService.create(createCategoryDto);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({
    operationId: 'getCategories',
    description: 'Get category list',
  })
  @ApiOkResponse({
    description: 'Successful response',
    type: CategoryEntity,
    isArray: true,
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getCategory',
    description: 'Create new category',
  })
  @ApiOkResponse({
    description: 'Successful response',
    type: CategoryEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({
    operationId: 'updateCategory',
    description: 'Update category',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Successfully updated',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.update(+id, updateCategoryDto);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({
    operationId: 'deleteCategory',
    description: 'Delete category',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Successfully deleted',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.categoriesService.remove(+id);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
