import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {UserActivity, UserActivityDocument} from './schemas/user-activity.schema'

@Injectable()
export class UserActivityService {
	constructor(@InjectModel(UserActivity.name) private userActivityModel: Model<UserActivityDocument>) {}

	async logActivity(action: string, userId: string): Promise<UserActivity> {
		const activity = new this.userActivityModel({action, userId})
		return activity.save()
	}

	// Diğer loglama veya sorgulama metodları buraya eklenebilir
}
