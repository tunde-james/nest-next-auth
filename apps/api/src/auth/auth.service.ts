import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('User already exist');
    }

    return await this.userService.create(createUserDto);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const isPasswordMatched = await argon2.verify(user.password, password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return {
      id: user.id,
      name: user.name,
    };
  }
}
