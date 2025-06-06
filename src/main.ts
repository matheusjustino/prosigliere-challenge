import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
	ExpressAdapter,
	NestExpressApplication,
} from '@nestjs/platform-express';
import compression from 'compression';
import { json } from 'express';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { configureAndBuildSwagger } from './common/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
	const PORT = process.env.PORT || 8080;
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter(),
	);

	app.enableCors({
		origin: process.env.ORIGIN_URLS
			? process.env.ORIGIN_URLS.split(',').map((url) => url.trim())
			: (origin, callback) => {
					console.log(
						`🔍 CORS Check: ${origin || 'no-origin'} - ALLOWED (test mode)`,
					);
					callback(null, true);
				},
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
		credentials: true,
	});
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'", "'unsafe-inline'"],
					styleSrc: ["'self'", "'unsafe-inline'"],
					imgSrc: ["'self'", 'data:'],
					fontSrc: ["'self'"],
				},
			},
		}),
	);
	app.use(compression());
	app.use(json({ limit: '30mb' }));
	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
		defaultVersion: '1',
	});
	app.useGlobalFilters(new AllExceptionsFilter());
	app.useGlobalInterceptors(
		new LoggingInterceptor(),
		new ResponseInterceptor(),
	);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			stopAtFirstError: true,
		}),
	);

	app.enableShutdownHooks();

	configureAndBuildSwagger(app);

	await app.listen(PORT, () => Logger.log(`App running on port: ${PORT}`));
}
bootstrap();
