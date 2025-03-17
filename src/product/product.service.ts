import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

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
      let { page, limit, sortBy, order, minprice, maxprice, name, description, categoryId } = query;

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      let skip = (page - 1) * limit;
      
      let sort: any = {};
      if (sortBy) {
        sort[sortBy] = order === 'desc' ? -1 : 1;
      } else {
        sort.name = -1;
      }
      
      let filter: Record<string, any> = {};
      if (name) {
        filter.name = { $regex: name, $options: 'i' };
      }
      if (description) {
        filter.description = { $regex: description, $options: 'i' };
      }
      if (categoryId) {
        if(mongoose.Types.ObjectId.isValid(categoryId)){
          filter.categoryId = categoryId;
        }
        else{
          return {Message: "Categoryid Noto'g'ri firmadda"}
        }
      }
      if (minprice || maxprice) {
        filter.price = {};
        if (minprice) filter.price.$gte = parseFloat(minprice);
        if (maxprice) filter.price.$lte = parseFloat(maxprice);
      }
      
      let products = await this.ProductSchema.find(filter)
        .populate('userId')
        .populate('categoryId')
        .sort(sort)
        .skip(skip)
        .limit(limit);
      let total = await this.ProductSchema.countDocuments(filter);
      return {
        total,
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
