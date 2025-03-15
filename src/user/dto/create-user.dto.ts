import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, Length, Matches } from "class-validator";

export enum Role  {
    USER = "USER",
    SELER = 'SELLER',
  };

export class CreateUserDto {
      @ApiProperty({example: "Alex"})
      @IsNotEmpty()
      @IsString()
      name: string;

      @ApiProperty({example: "998930451852"})
      @IsNotEmpty()
      @IsString()
      @Length(10,13)
      phone: string;

      @ApiProperty({example: "usmonqulovabduhamid00@gmail.com"})
      @IsNotEmpty()
      @IsEmail()
      @IsString()
      email: string;

      @ApiProperty({example: "50803006730015"})
      @IsNotEmpty()
      @IsString()
      @Length(4,16)
      password: string;

      @ApiProperty({example: "linke"})
      @IsOptional()
      @IsString()
      img: string;
      
      @ApiProperty({example: "adress"})
      @IsOptional()
      @IsString()
      location: string;

      @ApiProperty({example: "USER  |  SELLER"})
      @IsNotEmpty() 
      @IsEnum(Role)
      role: Role;

      @ApiProperty({example: "RegionId"})
      @IsNotEmpty()
      @IsString()
      @IsMongoId()
      regionId: string;


}
