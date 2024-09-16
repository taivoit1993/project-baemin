import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}
  async create(createAuthDto: CreateAuthDto) {
    const password = await bcrypt.hash(createAuthDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        password: createAuthDto.password,
      },
    });
    return user;
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.findUserByEamil(createAuthDto.email);

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(createAuthDto.password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }
    const roles = user.userRoles.map((userRole) => userRole.role.name);
    const token = this.jwtService.sign({ userId: user.id.toString(), email: user.email, roles }, { secret: process.env.JWT_SECRET });
    const { password, ...result } = user;
    return { ...result, token };
  }

  async findUserByEamil(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
    return user;
  }
}
