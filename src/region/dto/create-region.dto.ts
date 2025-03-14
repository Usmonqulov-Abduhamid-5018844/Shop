import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({example: "Toshkent"})
    @IsNotEmpty()
    @IsString()
    name: string;
}
export class GetMongoIdDto {

    @IsMongoId()
    id: string;
}


