import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export enum ProductType {
  ESKI = 'ESK',
  YANGI = 'YANGI',
}

export class CreateProductDto {
  @ApiProperty({ example: 'Telefon' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'linke' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 1400 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'phone 16 2024 yil da chiqarilgan' })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({ example: "YANGI | ESK"})
  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({example: "color"})
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({example: "67d3a639b0f028e6e82222b8"})
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;

  @ApiProperty({example: "67d3a639b0f028e6e82222b8"})
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  categoryId: string;
}
