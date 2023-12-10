import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AuthorizationService } from './authorization.service';
import { AuthorizeDto } from './dto/authorize.dto';
import { AuthorizedEntity } from './entities/authorized.entity';

@Controller('authorization')
@ApiTags('Authorization')
export class AuthorizationController {
  constructor(private authorizationService: AuthorizationService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({
    operationId: 'authorize',
    description: 'Authorize by username and password',
  })
  @ApiOkResponse({
    description: 'Successful response',
    type: AuthorizedEntity,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  signIn(@Body() authorizeDto: AuthorizeDto) {
    return this.authorizationService.signIn(
      authorizeDto.username,
      authorizeDto.password,
    );
  }
}
