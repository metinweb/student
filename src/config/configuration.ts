export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		uri: process.env.DATABASE_URI || 'mongodb://0.0.0.0:27017/student_registration'
	},
	jwt: {
		secret: process.env.JWT_SECRET || '3yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
		expiresIn: process.env.JWT_EXPIRES_IN || '1h'
	},
	aws: {
		region: process.env.AWS_REGION,
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	},
	email: {
		source: process.env.EMAIL_SOURCE || 'your-verified-email@example.com'
	}
})
