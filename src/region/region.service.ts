import { Injectable } from '@nestjs/common';
import { CreateRegionDto, GetMongoIdDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private RegionSchema: Model<Region>,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}

  async create(data: CreateRegionDto, req: any) {
    let user = await this.UserSchema.findById(req.user.Id);
    if (!user) {
      return { Message: 'User malumotlari topilmadi' };
    }
    if (user.role != 'ADMIN') {
      return { Message: "Regionni faqat admin qo'sha oladi" };
    }
    let { name } = data;
    let region = await this.RegionSchema.findOne({ name });
    if (region) {
      return { Message: 'Region name mavjud' };
    }
    return this.RegionSchema.create(data);
  }

  async findAll() {
    let region = await this.RegionSchema.find();
    if (!region.length) {
      return { Message: 'Not Found region' };
    }
    return region;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Region id Noto'g'ri" };
    }
    let region = await this.RegionSchema.findById(id);
    if (!region) {
      return { Message: 'Not Found region' };
    }
    return region;
  }

  async update(id: string, data: UpdateRegionDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Region id Noto'g'ri" };
    }
    let region = await this.RegionSchema.findById(id);
    if (!region) {
      return { Message: 'Not Found region' };
    }
    return this.RegionSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "Region id Noto'g'ri" };
    }
    let region = await this.RegionSchema.findById(id);
    if (!region) {
      return { Message: 'Not Found region' };
    }
    return this.RegionSchema.findByIdAndDelete(id);
  }
}
