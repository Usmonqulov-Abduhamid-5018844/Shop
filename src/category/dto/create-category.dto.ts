import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({example: "Elektronic"})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: "link"})
    @IsNotEmpty()
    @IsString()
    image: string;
}
