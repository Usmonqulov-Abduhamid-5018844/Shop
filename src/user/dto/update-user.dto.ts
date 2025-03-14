import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({example: "usmonqulovabduhamid00@gmail.com"})
  @IsNotEmpty()
  email: string;

  @ApiProperty({example: "Srting_0451852"})
  @IsNotEmpty()
  password: string;
}
