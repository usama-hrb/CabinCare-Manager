import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  const swagger = new DocumentBuilder()
    .setTitle('CabinCare Manager - App API')
    .setVersion('1.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swagger);
  //http://localhost:3000/swagger
  SwaggerModule.setup('swagger', app, swaggerDoc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
