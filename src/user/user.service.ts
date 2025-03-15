import { Injectable } from '@nestjs/common';
import { CreateUserDto, GetMongoIdDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserSchema: Model<User>,
    private Jwt: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      let { email, password} = data;
      let user = await this.UserSchema.findOne({ email });
      if (user) {
        return { Message: "Ro'yhaddan o'tgansiz" };
      }

      let hash = bcrypt.hashSync(password, 10);
      data.password = hash;
      return this.UserSchema.create(data);
    } catch (e) {
      return { Message: e.Message };
    }
  }
  async login(data: UpdateUserDto) {
   try{
    let { email, password } = data;
    let user = await this.UserSchema.findOne({ email });
    if (!user) {
      return { Message: "Ro'yhaddan o'tmagansiz" };
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return { Message: 'Password Xato kritildi' };
    }
    return { Token: this.Jwt.sign({ Id: user._id }) };
  }
  catch(e){
    return {Message: e.Message};
  }

   }
  async findAll() {
    try{
      let data = await this.UserSchema.find();
    if (!data.length) {
      return { Message: 'Not Fount User' };
    }
    return data;
    }
    catch(e){
      return {Message: e.Message};
    }
  }

  async findOne(id: GetMongoIdDto) {
    try{
      let user = await this.UserSchema.findById(id);
    if (!user) {
      return { Message: 'Not Found user' };
    }
    return user;
    }
    catch(e){
      return {Message: e.Message};
    }
  }

  async remove(id: string) {
    try{
      let user = await this.UserSchema.findById(id);
    if (!user) {
      return { Message: 'Not Found user' };
    }
    return this.UserSchema.findByIdAndDelete(id);
    }
    catch(e){
      return {Message: e.Message};
    }
  }
}
