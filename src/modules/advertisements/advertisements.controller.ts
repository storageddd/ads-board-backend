import { Request, Response } from 'express';
import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { type PaginationQuery } from '~/types';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementEntity } from './entities/advertisement.entity';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@Controller('advertisements')
@ApiTags('Advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'createAdvertisement',
    description: 'Create new advertisement',
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
    @Body() createAdvertisementDto: CreateAdvertisementDto,
  ) {
    const userId = req.user.sub;
    await this.advertisementsService.create(createAdvertisementDto, userId);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({
    operationId: 'getAdvertisements',
    description: 'Get advertisement list',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Pagination limit',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    description: 'Pagination offset',
    type: 'number',
    required: false,
  })
  @ApiOkResponse({
    description: 'Successful response',
    type: AdvertisementEntity,
    isArray: true,
  })
  findAll(@Query() query?: PaginationQuery) {
    const { limit, offset } = query;
    return this.advertisementsService.findAll(+limit, +offset);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getAdvertisement',
    description: 'Get advertisement',
  })
  @ApiOkResponse({
    description: 'Successful response',
    type: AdvertisementEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  findOne(@Param('id') id: string) {
    return this.advertisementsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'updateAdvertisement',
    description: 'Update advertisement',
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
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    await this.advertisementsService.update(
      +id,
      updateAdvertisementDto,
      req.user,
    );
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'deleteAdvertisement',
    description: 'Delete advertisement',
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
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.advertisementsService.remove(+id, req.user);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
