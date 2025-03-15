import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
UserModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
