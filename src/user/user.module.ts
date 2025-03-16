import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
    global: true,
    signOptions: { expiresIn: '1d' },
  }),
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
