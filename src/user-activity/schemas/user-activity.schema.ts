import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type UserActivityDocument = UserActivity & Document

@Schema({timestamps: true})
export class UserActivity {
	@Prop({required: true})
	action: string

	@Prop({required: true})
	userId: string

	@Prop({required: true, default: Date.now})
	timestamp: Date
}

export const UserActivitySchema = SchemaFactory.createForClass(UserActivity)
