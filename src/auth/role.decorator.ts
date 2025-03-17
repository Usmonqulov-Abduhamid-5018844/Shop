
import { Reflector } from '@nestjs/core';
import { Role } from 'src/user/schema/user.schema';

export const Roles = Reflector.createDecorator<Role[]>();
