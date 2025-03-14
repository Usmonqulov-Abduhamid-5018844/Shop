import { Injectable, Request, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderSchema: Model<Order>){}

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

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, data: {status: string} ) {
    return `This action updates a #${id} order`;
  }

}
