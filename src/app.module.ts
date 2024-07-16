import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import configuration from './config/configuration'
import {DatabaseModule} from './database/database.module'
import {AuthModule} from './auth/auth.module'
import {AdminModule} from './admin/admin.module'
import {StudentModule} from './student/student.module'
import {UserActivityModule} from './user-activity/user-activity.module'
import {SharedModule} from './shared/shared.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration]
		}),
		DatabaseModule,
		AuthModule,
		AdminModule,
		StudentModule,
		UserActivityModule,
		SharedModule
	]
})
export class AppModule {}
