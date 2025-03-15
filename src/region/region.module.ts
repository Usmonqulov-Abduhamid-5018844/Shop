import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, RegionSchema } from './schema/region.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Region.name, schema: RegionSchema},
    {name: User.name, schema: UserSchema},
  ])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
