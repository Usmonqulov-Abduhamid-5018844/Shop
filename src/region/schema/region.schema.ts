import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document   } from "mongoose";

@Schema()
export class Region extends Document {
    @Prop()
    name: String;
}
export const RegionSchema = SchemaFactory.createForClass(Region);
