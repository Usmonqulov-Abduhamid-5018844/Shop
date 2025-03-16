import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategorySchema: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    return await this.CategorySchema.create(data);
  }

  async findAll(query: Record<string,any>) {
    try{
      let sort: any = {};
      let page = parseInt(query.page) || 1;
      let limit = parseInt(query.limit) || 10;
      let skip = (page - 1) * limit;

      if (query.sortBy) {
        sort[query.sortBy] = query.order === 'desc' ? -1 : 1;
      } else {
        sort.name = -1;
      }
      let category = await this.CategorySchema.find()
        .sort(sort)
        .skip(skip)
        .limit(limit);

      return {
        total: category.length,
        page,
        limit,
        data: category,
      };
    }catch(error){
      return {Message: error}
    }
  };
  
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Category id Noto'g'ri" };
    }
    let data = await this.CategorySchema.findById(id);
    if (!data) {
      return { Message: 'Not Fount Category' };
    }
    return data;
  }

  async update(id: string, data: UpdateCategoryDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Category id Noto'g'ri" };
    }
    let category = await this.CategorySchema.findById(id);
    if (!category) {
      return { Message: 'Not Fount Category' };
    }
    return await this.CategorySchema.findByIdAndUpdate(id, data);
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Category id Noto'g'ri" };
    }
    let category = await this.CategorySchema.findById(id);
    if (!category) {
      return { Message: 'Not Fount Category' };
    }
    return await this.CategorySchema.findByIdAndDelete(id);
  }
}
