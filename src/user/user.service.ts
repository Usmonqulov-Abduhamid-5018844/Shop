import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
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
      let { email, password, phone } = data;
      let user = await this.UserSchema.findOne({ email });
      if (user) {
        return { Message: "Ro'yhaddan o'tgansiz" };
      }
      let UserPhonr = await this.UserSchema.findOne({ phone });
      if (UserPhonr) {
        return { Message: 'Bunday telefon raqam Bazada mavjud.' };
      }

      let hash = bcrypt.hashSync(password, 10);
      data.password = hash;
      return this.UserSchema.create(data);
    } catch (error) {
      return { Message: error };
    }
  }
  async login(data: UpdateUserDto) {
    try {
      let { email, password } = data;
      let user = await this.UserSchema.findOne({ email });
      if (!user) {
        return { Message: "Ro'yhaddan o'tmagansiz" };
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return { Message: 'Password Xato kritildi' };
      }
      let acsestoken = this.AcsessToken({ Id: user._id, role: user.role });
      return { acsestoken };
    } catch (error) {
      return { Message: error };
    }
  }
  async findAll() {
    try {
      let data = await this.UserSchema.find().populate('regionId');
      if (!data.length) {
        return { Message: 'Not Fount User' };
      }
      return data;
    } catch (error) {
      return { Message: error };
    }
  }

  async findOne(id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { Message: "User id Noto'g'ri" };
      }
      try {
        let user = await this.UserSchema.findById(id).populate('regionId');
        if (!user) {
          return { Message: 'Not Found user' };
        }
        return user;
      } catch (e) {
        return { Message: e.Message };
      }
    } catch (error) {
      return { Message: error };
    }
  }

  async remove(id: string, req: any) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { Message: "User id Noto'g'ri" };
      }
      let user = await this.UserSchema.findById(id);
      if (!user) {
        return { Message: 'Not Found user' };
      }
      
      if(!(user._id == req.user.Id || req.user.role == "ADMIN")){
        return {Message: "Sizda Administratsiya huquqi yo'q"}
      }
      return {Deleted: await this.UserSchema.findByIdAndDelete(id)}
    } catch (error) {
      return { Message: error };
    }
  }

  AcsessToken(pelod: { Id: any; role: string }) {
    return this.Jwt.sign(pelod, { secret: 'acsestoken' });
  }
}
