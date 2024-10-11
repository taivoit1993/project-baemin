import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';

export const ROLES_KEY = 'roles';
export const Role = (...roles: string[]) => {
  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtGuard, RoleGuard),
  );
};
