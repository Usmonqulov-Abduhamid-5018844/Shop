import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class Info {
    @ApiProperty({example: "admin sfatida tayinlanish kerak bo'lgan userId"})
    @IsNotEmpty()
    @IsMongoId()
    userId: string
}