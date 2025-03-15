import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private CommentSchema: Model<Comment>,
    @InjectModel(Product.name) private ProductSchema: Model<Product>,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}

  async create(comment: CreateCommentDto, req: any) {
    let userId = req.user.Id;
    let product = await this.ProductSchema.findById(comment.productId);
    if (!product) {
      return { Message: 'Not fount Product Id' };
    }
    let date = new Date();
    let newComment = {
      ...comment,
      userId,
      date,
    };
    return await this.CommentSchema.create(newComment);
  }

  async findAll() {
    let data = await this.CommentSchema.find().populate("productId").populate("userId")
    if (!data.length) {
      return { Message: 'Not Fount comment' };
    }
    return data;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Comment id Noto'g'ri" };
    }
    let data = await this.CommentSchema.findById(id).populate("productId").populate("userId")
    if (!data) {
      return { Message: 'Not Fount comment' };
    }
    return data;
  }

  async remove(id: string, req: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Comment id Noto'g'ri" };
    }
    let comment = await this.CommentSchema.findById(id);
    if (!comment) {
      return { Message: 'Not Fount comment' };
    }
    let userId = req.user.Id;
    let user = await this.UserSchema.findById(userId);
    if(!user){
      return {Message: "User malumotlari topilmadi"}
    }
    if(!(user._id == comment.userId || user.role == "ADMIN")){
      return {Message: "Siz faqat o'zingizga tegishli malumotlarni o'chira olasiz!"}
    }
    return await this.CommentSchema.findByIdAndDelete(id);
  }
}
