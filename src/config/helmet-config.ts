import {HelmetOptions} from 'helmet'

export const helmetConfig: Partial<HelmetOptions> = {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			styleSrc: ["'self'", "'unsafe-inline'"],
			imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
			scriptSrc: ["'self'", "https: 'unsafe-inline'"]
		}
	},
	crossOriginEmbedderPolicy: false,
	crossOriginResourcePolicy: {policy: 'cross-origin'}
}
