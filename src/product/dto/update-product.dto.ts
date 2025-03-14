import {  ProductType } from './create-product.dto';
import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateProductDto{
      @ApiProperty({ example: 'Telefon' })
      @IsString()
      name: string;
    
      @ApiProperty({ example: 'linke' })
      @IsString()
      image: string;
    
      @ApiProperty({ example: 1400 })
      @Type(() => Number)
      @IsNumber()
      price: number;
    
      @ApiProperty({ example: 'phone 16 2024 yil da chiqarilgan' })
      @IsString()
      description: string;
    
    
      @ApiProperty({ example: "YANGI | ESK"})
      @IsEnum(ProductType)
      type: ProductType;
    
      @ApiProperty({example: "color"})
      @IsString()
      color: string;
    
      @ApiProperty({example: "67d3a639b0f028e6e82222b8"})
      @IsString()
      @IsMongoId()
      userId: string;
    
      @ApiProperty({example: "67d3a639b0f028e6e82222b8"})
      @IsString()
      @IsMongoId()
      categoryId: string;
    }
    
