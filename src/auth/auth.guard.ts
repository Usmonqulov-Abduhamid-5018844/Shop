import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly Jwt: JwtService){}
  canActivate(context: ExecutionContext): boolean {
    let request: Request = context.switchToHttp().getRequest();
    let Token = request.headers.authorization?.split(' ')[1];
    if (!Token) {
      throw new UnauthorizedException('Token is missing');
    }
    try{
      let Users = this.Jwt.verify(Token);
      request["user"] = Users;
      return true;
    }
    catch(e){
      throw new UnauthorizedException("Invalid Token")
    }
  }
}
