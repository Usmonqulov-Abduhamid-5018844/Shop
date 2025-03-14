import { Injectable } from '@nestjs/common';
import { CreateRegionDto, GetMongoIdDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region.schema';
import { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private RegionSchema: Model<Region>) {}

  async create(data: CreateRegionDto) {
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
    let region = await this.RegionSchema.findById(id);
    if (!region) {
      return { Message: 'Not Found region' };
    }
    return region;
  }

  async update(id: string, data: UpdateRegionDto) {
    let region = await this.RegionSchema.findById(id);
    if (!region) {
      return { Message: 'Not Found region' };
    }
    return this.RegionSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id: string) {
    let region = await this.RegionSchema.findById(id);
    if (!region) {
      return { Message: 'Not Found region' };
    }
    return this.RegionSchema.findByIdAndDelete(id)
  }
}
