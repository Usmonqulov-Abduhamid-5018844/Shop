import { Injectable, Request, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderSchema: Model<Order>) {}

  async create(Orders: CreateOrderDto, req: any) {
    let DATE = new Date();
    let userId = req.user.Id;
    let newOrder = {
      ...Orders,
      DATE,
      userId,
    };
    return await this.OrderSchema.create(newOrder);
  }
  async findAll() {
    let data = await this.OrderSchema.find()
      .populate('productId')
      .populate('userId');
    if (!data.length) {
      return { Message: 'Not Found Order' };
    }
    return data;
  }
  async Update(id: string, req: any) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { Message: "OrderId noto'g'ri formatda jo'natilgan" };
    }
    let data = await this.OrderSchema.findById(id);
    if (!data) {
      return { Message: "O'rder topilmadi" };
    }
    if (req.user.role != 'ADMIN') {
      return { Message: "Sizda administratsiya huquqi yo'q" };
    }
    return {
      Message: 'Status Update',
      Order: await this.OrderSchema.findByIdAndUpdate(
        id,
        { status: 'Active' },
        { new: true },
      ),
    };
  }
}
