import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRegionDto {
    @ApiProperty({example: "Toshkent"})
    @IsNotEmpty()
    @IsString()
    name: string;

}



