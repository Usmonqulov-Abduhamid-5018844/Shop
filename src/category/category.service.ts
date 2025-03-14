import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategorySchema: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    return await this.CategorySchema.create(data);
  }

  async findAll() {
    let data = await this.CategorySchema.find();
    if(!data.length){
      return {Message: "Not Found Category"}
    }
    return data
  }

  async findOne(id: string) {
    let data = await this.CategorySchema.findById(id)
    if(!data){
      return {Message: "Not Fount Category"}
    }
    return data
  }

  async update(id: string, data: UpdateCategoryDto) {
    let category = await this.CategorySchema.findById(id)
    if(!category){
      return {Message: "Not Fount Category"}
    }
    return await this.CategorySchema.findByIdAndUpdate(id, data);
  }

  async remove(id: string) {
    let category = await this.CategorySchema.findById(id)
    if(!category){
      return {Message: "Not Fount Category"}
    }
    return await this.CategorySchema.findByIdAndDelete(id);
  }
}
