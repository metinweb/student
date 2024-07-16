import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {UserActivityService} from './user-activity.service'
import {UserActivity, UserActivitySchema} from './schemas/user-activity.schema'

@Module({
	imports: [MongooseModule.forFeature([{name: UserActivity.name, schema: UserActivitySchema}])],
	providers: [UserActivityService],
	exports: [UserActivityService]
})
export class UserActivityModule {}
