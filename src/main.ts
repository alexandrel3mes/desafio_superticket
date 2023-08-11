import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { CompanyModule } from './modules/company/company.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { AuthModule } from './modules/auth/auth.module';
import { LawyersModule } from './modules/lawyers/lawyers.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Seu Direito API')
    .setDescription('API para criar e gerir ordens de serviço')
    .setVersion('1.0')
    .addTag('Usuário')
    .addTag('Company - Empresa')
    .addTag('Lawyer - Advogado')
    .addTag('Activity - Ramo de atividades')
    .addTag('Orders - Ordem de serviço')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    include: [
      CompanyModule,
      ActivitiesModule,
      AuthModule,
      LawyersModule,
      UsersModule,
      OrdersModule,
    ],
    ignoreGlobalPrefix: true,
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
