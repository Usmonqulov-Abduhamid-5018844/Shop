import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @Post('login')
  login(@Body() data: UpdateUserDto) {
    return this.userService.login(data);
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sortBy', required: true, example: 'name' })
  @ApiQuery({ name: 'order', required: true, enum: ['asc', 'desc'] })
  findAll(@Query() query: Record<string, any>) {
    return this.userService.findAll(query);
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
