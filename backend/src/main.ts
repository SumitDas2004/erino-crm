import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseModelInterceptor } from './Interceptors/ResponseModelInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'warn']
  });
  app.useGlobalInterceptors(new ResponseModelInterceptor())
  app.enableCors({origin:'*'})
  await app.listen(8000);
}
bootstrap();
