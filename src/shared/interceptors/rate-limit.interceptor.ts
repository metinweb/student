import {Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus} from '@nestjs/common'
import {Observable} from 'rxjs'
import {RateLimiterMemory} from 'rate-limiter-flexible'

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
	private rateLimiter: RateLimiterMemory

	constructor() {
		this.rateLimiter = new RateLimiterMemory({
			points: 10, // Number of points
			duration: 1 // Per second
		})
	}

	async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest()
		const key = request.ip

		try {
			await this.rateLimiter.consume(key)
			return next.handle()
		} catch (rejRes) {
			throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS)
		}
	}
}
