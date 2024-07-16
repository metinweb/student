import {Catch, ExceptionFilter, ArgumentsHost, HttpStatus} from '@nestjs/common'
import {MongoError} from 'mongodb'

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
	catch(exception: MongoError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const request = ctx.getRequest()

		let status = HttpStatus.INTERNAL_SERVER_ERROR
		let message = 'Internal server error'

		switch (exception.code) {
			case 11000:
				status = HttpStatus.CONFLICT
				message = 'Duplicate key error'
				break
			case 121:
				status = HttpStatus.BAD_REQUEST
				message = 'Document failed validation'
				break
			case 211:
				status = HttpStatus.BAD_REQUEST
				message = 'MongoDB encountered an invalid operator'
				break
			case 2:
				status = HttpStatus.BAD_REQUEST
				message = 'Invalid operation'
				break
			case 50:
				status = HttpStatus.INTERNAL_SERVER_ERROR
				message = 'MongoDB execution timeout'
				break
			case 13:
				status = HttpStatus.UNAUTHORIZED
				message = 'Unauthorized access to database'
				break
		}

		response.status(status).json({
			statusCode: status,
			message: message,
			timestamp: new Date().toISOString(),
			path: request.url
		})
	}
}
