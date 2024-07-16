import {IsString, IsEmail, IsDate, IsNotEmpty} from 'class-validator'

export class CreateStudentDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsDate()
	@IsNotEmpty()
	birthDate: Date

	@IsString()
	@IsNotEmpty()
	class: string
}
