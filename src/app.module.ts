import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ClsGuard, ClsModule } from 'nestjs-cls';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './app/user/user.module';
import { UserEntity } from './database/entity/User.entity';
import { AuthModule } from './app/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { CorsModule } from './app/cors/cors.module';
import { PageModule } from './app/pages/pages.module';
import { TariffsModule } from './app/tariffs/tariffs.module';
import { OrderModule } from './app/order/order.module';
import { join } from 'path';
import { PackageModule } from './app/package/package.module';
import { UploadModule } from './app/upload/upload.module';
import { NewsModule } from './app/news/news.module';
import { RedisModule } from './shared/libs/redis/redis.module';

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
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    UserModule,
    AuthModule,
    CorsModule,
    PageModule,
    TariffsModule,
    OrderModule,
    PackageModule,
    UploadModule,
    NewsModule,
    RedisModule.register({host:config.redis.host,port:config.redis.port})

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
