import {forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {AdminService} from '../admin/admin.service'

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => AdminService))
		private adminService: AdminService,
		private jwtService: JwtService
	) {}

	async validateAdmin(username: string, password: string) {
		const admin = await this.adminService.findByUsername(username)
		if (admin && (await admin.comparePassword(password))) {
			return admin
		}
		return null
	}

	async login(admin: any) {
		const payload = {username: admin.username, sub: admin._id}
		try {
			await this.adminService.updateLastLogin(admin._id)
			return {
				access_token: this.jwtService.sign(payload)
			}
		} catch (error) {
			throw new UnauthorizedException('Failed to update last login')
		}
	}
}
