import {Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses'

@Injectable()
export class AwsSesService {
	private sesClient: SESClient

	constructor(private configService: ConfigService) {
		this.sesClient = new SESClient({
			region: this.configService.get<string>('aws.region'),
			credentials: {
				accessKeyId: this.configService.get<string>('aws.accessKeyId'),
				secretAccessKey: this.configService.get<string>('aws.secretAccessKey')
			}
		})
	}

	async sendEmail(to: string, subject: string, body: string): Promise<void> {
		const params = {
			Destination: {
				ToAddresses: [to]
			},
			Message: {
				Body: {
					Text: {Data: body}
				},
				Subject: {Data: subject}
			},
			Source: this.configService.get<string>('aws.senderEmail')
		}

		try {
			const command = new SendEmailCommand(params)
			await this.sesClient.send(command)
		} catch (error) {
			console.error('Failed to send email', error)
			throw error
		}
	}
}
