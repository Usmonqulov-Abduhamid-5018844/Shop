import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({example: "usmonqulovabduhamid00@gmail.com"})
  @IsNotEmpty()
  email: string;

  @ApiProperty({example: "50803006730015"})
  @IsNotEmpty()
  password: string;
}
