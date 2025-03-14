import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { User } from 'src/user/schema/user.schema';

export enum ProductType {
  ESKI = 'ESK',
  YANGI = 'YANGI',
}

@Schema({ timestamps: true })
export class Product extends Document {

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop()
  description: string;

  @Prop({ type: [String]}) 
  star: string[];

  @Prop({type: [String]})
  commit?: string[]

  @Prop({ required: true, enum: ProductType })
  type: ProductType;

  @Prop({ required: true })
  color: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',}) 
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category',})
  categoryId: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
