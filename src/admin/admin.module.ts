import {Module, forwardRef} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {AdminService} from './admin.service'
import {AdminController} from './admin.controller'
import {Admin, AdminSchema} from './schemas/admin.schema'
import {UserActivityModule} from '../user-activity/user-activity.module'
import {AuthModule} from '../auth/auth.module'

@Module({
	imports: [
		MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}]),
		UserActivityModule,
		forwardRef(() => AuthModule) // AuthModule'u forwardRef ile import ediyoruz
	],
	providers: [AdminService],
	controllers: [AdminController],
	exports: [AdminService]
})
export class AdminModule {}