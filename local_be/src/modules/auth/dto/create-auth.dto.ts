import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'user@example.com' , required: true})
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user123', required: true })
  @IsString()
  @Length(8, 20)
  password: string;
}
