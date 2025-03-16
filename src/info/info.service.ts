import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/schema/product.schema';
import { User } from 'src/user/schema/user.schema';
import { Info } from './dto/Add_admin.Dto';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(User.name) private UserSchema: Model<User>,
    @InjectModel(Product.name) private ProductSchema: Model<Product>,
  ) {}

  async Add_admin(userId: Info, req: any) {
    try {
      let JwtId = req.user.Id;
      let data = await this.UserSchema.findById(JwtId);
      if (!data) {
        return { Message: 'Malumotlaringiz tomilmadi' };
      }

      if (data.role != 'ADMIN') {
        return { Message: "Admin tayinlash uchun huquqingiz yo'q!" };
      }
      let user = await this.UserSchema.findById(userId.userId);
      if (!user) {
        return { Message: 'Not Fount User id' };
      }

      let Update = await this.UserSchema.findByIdAndUpdate(
        user.id,
        { role: 'ADMIN' },
        { new: true },
      );
      return { Message: 'Admin muvofiyaqatli yaratildi', data: Update };
    } catch (error) {
      return { Message: error };
    }
  }

  async MY_data(req: any) {
    let userId = req.user.Id;
    let data = await this.UserSchema.findById(userId).populate('regionId')
    if(!data){
      return {Message: "Malumotlaringi topilmadi"}
    }
    return data
  }
  async My_product(req: any) {
    let userId = req.user.Id;
    let user = await this.UserSchema.findById(userId);
    if(!user){
      return {Message :"User malumotlari topilmadi."};
    }
    if(user.role != "SELLER"){
      return {Message :"Siz SELLER emassiz!"};
    }
    let product =  await this.ProductSchema.find({userId}).populate("categoryId")
    if(!product.length){
      return {Message: "Not Fount product"};
    }
    return product
    
  }
}
