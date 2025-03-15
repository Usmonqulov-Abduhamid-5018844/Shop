import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'productId' })
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({example: 4})
  @Type(()=> Number)
  star: number;

  @ApiProperty({example: "Zo'r mahsulod ekan"})
  @IsNotEmpty()
  comment: string

}
