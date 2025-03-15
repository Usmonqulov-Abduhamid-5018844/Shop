import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { InfoService } from './info.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Info } from './dto/Add_admin.Dto';

@UseGuards(AuthGuard)
@ApiTags('Informatsiya')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Post("Add_admin")
  Add_admin(@Request() req: any, @Body() userId: Info){
    return this.infoService.Add_admin(userId, req)
  }
  @Get('My_data')
  My_data(@Request() req: any) {
    return this.infoService.MY_data(req)
  }

  @Get('My_product')
  My_product(@Request() req: any) {
    return this.infoService.My_product(req)
  }
}
