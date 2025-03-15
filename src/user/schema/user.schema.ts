import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document, Types } from 'mongoose';
import { Region } from 'src/region/schema/region.schema';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SELLER = 'SELLER',
}

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  img?: string;

  @Prop()
  location?: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  regionId: Region;
}

export const UserSchema = SchemaFactory.createForClass(User);
