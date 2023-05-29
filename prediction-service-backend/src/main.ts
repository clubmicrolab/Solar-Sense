import { NestFactory } from '@nestjs/core';
import { WeatherModule } from './weather.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(WeatherModule);
  await app.listen(3000);
}

bootstrap();
