import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    
    @ApiProperty({example: "productId"})
    @IsNotEmpty()
    @IsMongoId()
    productId: string;

    @ApiProperty({example: "count"})
    @IsNotEmpty()
    @Type(()=> Number)
    count: number
}
