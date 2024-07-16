import {NestFactory} from '@nestjs/core'
import {ValidationPipe} from '@nestjs/common'
import {AppModule} from './app.module'
import {LoggerService} from './shared/services/logger.service'
import {MongoExceptionFilter} from './common/exceptions/mongo-exception.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggerService()
	})
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true
		})
	)
	app.useGlobalFilters(new MongoExceptionFilter())
	await app.listen(3000)
}
bootstrap()
