import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import * as mongoose from 'mongoose'

export type StudentDocument = Student & Document

@Schema({timestamps: true})
export class Student {
	@Prop({required: true})
	name: string

	@Prop({required: true, unique: true, validate: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/})
	email: string

	@Prop({required: true})
	birthDate: Date

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Class'})
	class: mongoose.Schema.Types.ObjectId

	@Prop({default: true})
	isActive: boolean
}

export const StudentSchema = SchemaFactory.createForClass(Student)
