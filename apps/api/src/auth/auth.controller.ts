import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('sign-up')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req) {
    return await this.authService.login(req.user.id, req.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() req) {
    return {
      message: `Now you can access this protected API, this is your ID: ${req.user.id}`,
    };
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user.id, req.user.name);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // console.log('Google User', req.user);

    const userData = await this.authService.login(req.user.id, req.user.name);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    const params = new URLSearchParams({
      userId: String(userData.id),
      name: userData.name,
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    });

    res.redirect(
      `${frontendUrl}/api/auth/google/callback?${params.toString()}`,
    );

    // res.redirect(
    //   `${frontendUrl}/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&accessToken=${userData.accessToken}&refreshToken=${userData.refreshToken}`,
    // );
  }
}
