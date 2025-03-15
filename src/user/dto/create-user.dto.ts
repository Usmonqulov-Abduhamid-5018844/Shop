import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, Length, Matches } from "class-validator";

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
      phone: string;

      @ApiProperty({example: "usmonqulovabduhamid00@gmail.com"})
      @IsNotEmpty()
      @IsString()
      email: string;

      @ApiProperty({example: "Srting_0451852"})
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
      @IsOptional() 
      @IsEnum(Role)
      role: Role;

      @ApiProperty({example: "67d3a639b0f028e6e82222b8"})
      @IsOptional()
      @IsString()
      @IsMongoId()
      regionId: string;


}
export class GetMongoIdDto {
  @IsMongoId()
  id: string;
}