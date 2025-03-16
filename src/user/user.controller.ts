import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @Post("login")
  login(@Body() data: UpdateUserDto){
    return this.userService.login(data)
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete('Delet_Acaunt/:id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.userService.remove(id, req);
  }
}
