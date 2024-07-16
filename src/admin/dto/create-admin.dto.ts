import {IsString, IsNotEmpty, IsArray, MinLength, Matches} from 'class-validator'

export class CreateAdminDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	username: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d!@#$%^&*()]{8,}$/, {
		message: 'Password too weak. It should contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
	})
	password: string

	@IsArray()
	@IsString({each: true})
	permissions: string[]
}
