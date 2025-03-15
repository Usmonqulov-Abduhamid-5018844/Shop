import { Injectable, Request, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderSchema: Model<Order>,
               @InjectModel(User.name) private UserSchema: Model<User>
){}

  async create(Orders: CreateOrderDto, req: any) {
   let DATE = new Date()
   let userId = req.user.Id;
    let newOrder = {
      ...Orders,
      DATE,
      userId,
    }
    return await this.OrderSchema.create(newOrder) 
  }

  async findAll() {
    let data = await this.OrderSchema.find()
    if(!data.length){
      return {Message: "Not Found Order"}
    }
    return data
  }

  async update(id: string, req:any) {
    let userId = req.user.Id;
    let USER = this.UserSchema.findById(id)
    console.log(USER);
    
  }

}
