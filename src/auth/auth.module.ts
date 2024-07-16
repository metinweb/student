import {Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {JwtStrategy} from './jwt.strategy'
import {AdminModule} from '../admin/admin.module'

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('jwt.secret'),
				signOptions: {expiresIn: configService.get<string>('jwt.expiresIn')}
			}),
			inject: [ConfigService]
		}),
		AdminModule
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService] // AuthService'i export ediyoruz
})
export class AuthModule {}