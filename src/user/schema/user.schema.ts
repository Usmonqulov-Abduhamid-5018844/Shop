import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Region } from 'src/region/schema/region.schema';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SELLER = 'SELLER',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  img?: string;

  @Prop()
  location?: string;

  @Prop()
  shopname?: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: Types.ObjectId, ref: 'Region', required: false })
  @Type(() => Region)
  regionId?: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  orders?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
