import {Module, Global} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {AwsSesService} from './services/aws-ses.service'
import {LoggerService} from './services/logger.service'

@Global()
@Module({
	imports: [ConfigModule],
	providers: [AwsSesService, LoggerService],
	exports: [AwsSesService, LoggerService]
})
export class SharedModule {}
