import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './upload/upload.module';
import { OrdersModule } from './orders/orders.module';
import { CommentsModule } from './comments/comments.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://usmonqulovabduhamid_2000:50803006730015@abduhamid.2nenh.mongodb.net/Shop?retryWrites=true&w=majority&appName=Abduhamid'), UserModule, RegionModule, CategoryModule, ProductModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/file',
    }),
    OrdersModule,
    CommentsModule,
    InfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}