import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Comment } from 'src/comments/schema/comment.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductSchema: Model<Product>,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}

  async create(data: CreateProductDto, req: any) {
    let userId = req.user.Id;
    let user = await this.UserSchema.findById(userId);
    if (!user) {
      return { Message: 'Malumotlaringiz topilmadi' };
    }
    if (user.role != 'SELLER') {
      return { Message: "Product yaratish uchun SELLER bo'lishingiz kerak" };
    }
    let newProduct = {
      ...data,
      userId,
    };
    return await this.ProductSchema.create(newProduct);
  }
  async findAll(query: Record<string, any>) {
    try {
      let sort: any = {};
      let page = parseInt(query.page) || 1;
      let limit = parseInt(query.limit) || 10;
      let skip = (page - 1) * limit;

      if (query.sortBy) {
        sort[query.sortBy] = query.order === 'desc' ? -1 : 1;
      } else {
        sort.name = -1;
      }
      let products = await this.ProductSchema.find()
        .populate('userId')
        .populate('categoryId')
        .sort(sort)
        .skip(skip)
        .limit(limit);

      return {
        total: products.length,
        page,
        limit,
        data: products,
      };
    } catch (error) {
      return { Message: error.message || 'Xatolik yuz berdi' };
    }
  }

  async findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { Message: "Product id Noto'g'ri" };
      }
      let product = await this.ProductSchema.findById(id)
        .populate('userId')
        .populate('categoryId');
      if (!product) {
        return { Message: 'Not Fount Product id' };
      }
      return product;
    } catch (error) {
      return { Message: error.Message };
    }
  }

  async update(id: string, data: UpdateProductDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Product id Noto'g'ri" };
    }
    let product = await this.ProductSchema.findById(id);
    if (!product) {
      return { Message: 'Not Fount Product id' };
    }
    return await this.ProductSchema.findByIdAndUpdate(id, data);
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Produc id Noto'g'ri" };
    }
    let product = await this.ProductSchema.findById(id);
    if (!product) {
      return { Message: 'Not Fount Product id' };
    }
    return await this.ProductSchema.findByIdAndDelete(id);
  }
}
