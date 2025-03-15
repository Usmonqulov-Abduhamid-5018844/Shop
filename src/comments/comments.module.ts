import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Product, ProductSchema } from 'src/product/schema/product.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: Comment.name, schema: CommentSchema},
    {name: Product.name, schema: ProductSchema},
    {name: User.name, schema: UserSchema},
  ])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
