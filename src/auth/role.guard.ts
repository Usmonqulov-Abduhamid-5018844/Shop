
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
   try{
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(!roles.includes(user.roles)){
      throw new UnauthorizedException()
    }
    return true
   }catch(error){
    throw new UnauthorizedException()
   }
  }
}
