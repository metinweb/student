import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type StudentDocument = Student & Document

@Schema()
export class Student {
	@Prop({required: true})
	name: string

	@Prop({required: true, unique: true})
	email: string

	@Prop({required: true})
	birthDate: Date

	// Diğer öğrenci özellikleri buraya eklenebilir
}

export const StudentSchema = SchemaFactory.createForClass(Student)
