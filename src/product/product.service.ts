import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import mongoose, { Model } from 'mongoose';
import { GetMongoIdDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductSchema: Model<Product>,
  ) {}

  async create(data: CreateProductDto) {
    return await this.ProductSchema.create(data);
  }

  async findAll() {
    let product = await this.ProductSchema.find();
    if (!product.length) {
      return { Message: 'Not Fount Product' };
    }
    return product;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Id Noto'g'ri kritildi");
    }
    let product = await this.ProductSchema.findById(id);
    if (!product) {
      return { Message: 'Not Fount Product id' };
    }
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    let product = await this.ProductSchema.findById(id);
    if (!product) {
      return { Message: 'Not Fount Product id' };
    }
    return await this.ProductSchema.findByIdAndUpdate(id, data);
  }

  async remove(id: string) {
    let product = await this.ProductSchema.findById(id);
    if (!product) {
      return { Message: 'Not Fount Product id' };
    }
    return await this.ProductSchema.findByIdAndDelete(id);
  }
}
