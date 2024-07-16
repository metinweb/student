import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import * as bcrypt from 'bcrypt'

export type AdminDocument = Admin & Document

@Schema()
export class Admin {
	@Prop({required: true, unique: true})
	username: string

	@Prop({required: true})
	password: string

	@Prop([String])
	permissions: string[]

	@Prop({type: Date, default: Date.now})
	lastLogin: Date

	comparePassword: Function
}

export const AdminSchema = SchemaFactory.createForClass(Admin)

AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password)
}

AdminSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10)
	}
	next()
})
