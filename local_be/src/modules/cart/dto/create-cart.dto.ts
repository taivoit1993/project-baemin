import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: 1 })
  @IsString()
  productId: string;

  userId: string;
}
