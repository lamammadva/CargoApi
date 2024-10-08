import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ClsGuard, ClsModule } from 'nestjs-cls';
import { UserModule } from './app/user/user.module';
import { UserEntity } from './database/entity/User.entity';
import { AuthModule } from './app/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { CorsModule } from './app/cors/cors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: +config.database.port,
      username: config.database.user,
      password: config.database.pass,
      database: config.database.name,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: config.jwt,
      signOptions: { expiresIn: '60d' },
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'lemanb.memmedova@gmail.com',
          pass: 'qxigqrpcggcfvskx',
        },
      },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      guard: { mount: true },
    }),
    UserModule,
    AuthModule,
    CorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
