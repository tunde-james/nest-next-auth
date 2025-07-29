import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh-token.strategies';
import googleOauthConfig from './config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
