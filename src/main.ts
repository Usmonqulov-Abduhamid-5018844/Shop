import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const Port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Shop Uzum')
    .setDescription('The Shop API description')
    .setVersion('5.5')
    .addSecurityRequirements("bearer", ["bearer"]).addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(Port, ()=> {
    console.log(`Server Started On Post ${Port || 3000}`);
    
  });
}
bootstrap();
