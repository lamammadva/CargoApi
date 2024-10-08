import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  const config = new DocumentBuilder()
    .setTitle('166cargo.az')
    .setDescription("166cargo project's api ")
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('166cargo.az')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(process.env.PORT);
}

bootstrap();
