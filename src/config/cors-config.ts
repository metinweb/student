import {CorsOptions} from '@nestjs/common/interfaces/external/cors-options.interface'

export const corsConfig: CorsOptions = {
	origin: ['http://localhost:3000', 'https://yourdomain.com'],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	exposedHeaders: ['Content-Length'],
	credentials: true,
	maxAge: 3600
}
