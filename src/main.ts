import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _logger = new Logger('ApiRunning'); 

  app.enableCors();
  app.setGlobalPrefix('api');
  const port = AppModule.port;

  await app.listen(port, () => {
    _logger.log(`Corriendo en el puerto ${port}`);
  });
}

bootstrap();
