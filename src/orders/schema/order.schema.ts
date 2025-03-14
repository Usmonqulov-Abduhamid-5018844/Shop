import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { Date, Document, Types } from "mongoose";
import { Product } from "src/product/schema/product.schema";
import { User } from "src/user/schema/user.schema";

@Schema()
export class Order extends Document {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    userId: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Product"})
    productId: Product

    @Prop()
    @Type(()=> Number)
    count: number;

    @Prop({default: "PENDING"})
    status: string

    @Prop({ type: Date, default: Date.now })
    date: Date
}

export const OrderSchema = SchemaFactory.createForClass(Order);
