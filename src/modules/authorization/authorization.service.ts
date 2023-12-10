import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from '~/services/prisma.service';
import { comparePassword } from '~/utils/comparePassword';

@Injectable()
export class AuthorizationService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      ...payload,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(
    id: number,
    username: string,
    role: UserRole,
  ): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
        username,
        role,
      },
    });
  }
}
