import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Product, ProductSchema } from 'src/product/schema/product.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: Product.name, schema: ProductSchema},
  ])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
