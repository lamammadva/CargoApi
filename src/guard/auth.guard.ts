import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { UserService } from 'src/app/user/user.service';
import { UserRole } from 'src/shared/enum/user.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cls: ClsService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new NotFoundException('not found token');
    }

    
    try {
      const payload = this.jwtService.verify(token);
      
      if (!payload.userId) {
        throw new Error();
      }

      
      request.userId = payload.userId;

      const user = await this.userService.findOne({
        where: { id: payload.userId },
      });
      
      if (!user) {
        throw new Error();
      }
      
      const roles =  this.reflector.get("roles",context.getHandler()) 
      
      if (roles && !user.role.includes(UserRole.ADMIN)){
        let checkRole = roles.find((role)=>user.role?.includes(role))
        if(!checkRole){
          throw new UnauthorizedException()
        }

      }

      this.cls.set('user', user);

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
