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
  Delete,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { type PaginationQuery } from '~/types';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    operationId: 'createUser',
    description: 'Create new user',
  })
  @ApiCreatedResponse({
    description: 'Successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return res.sendStatus(HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({
    operationId: 'getUsers',
    description: 'Get user list',
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
    type: UserEntity,
    isArray: true,
  })
  findAll(@Query() query?: PaginationQuery) {
    const { limit, offset } = query;
    return this.usersService.findAll(+limit, +offset);
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getUser',
    description: 'Get user',
  })
  @ApiOkResponse({
    description: 'Successful response',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'updateUser',
    description: 'Update user',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(+id, updateUserDto, req.user);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'deleteUser',
    description: 'Delete user',
  })
  @ApiBearerAuth()
  @ApiNoContentResponse({
    description: 'Successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.usersService.remove(+id, req.user);
    return res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
