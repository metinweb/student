import {NestFactory, Reflector} from '@nestjs/core'
import {ValidationPipe} from '@nestjs/common'
import {AppModule} from './app.module'
import {LoggerService} from './shared/services/logger.service'
import {MongoExceptionFilter} from './common/exceptions/mongo-exception.filter'
import {JwtAuthGuard} from './auth/guards/jwt-auth.guard'
import {IS_PUBLIC_KEY} from './shared/decorators/public-route.decorator'

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

	const reflector = app.get(Reflector)
	app.useGlobalGuards(new JwtAuthGuard(reflector))

	app.useGlobalFilters(new MongoExceptionFilter())
	await app.listen(3000)
}
bootstrap()
