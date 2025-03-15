import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document, Types} from "mongoose";
import { Product } from "src/product/schema/product.schema";
import { User } from "src/user/schema/user.schema";

@Schema()
export class Comment extends Document{
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Product"})
    productId: Product

    @Prop()
    star: number;

    @Prop()
    comment: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
    userId: User

    @Prop()
    date: string
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
