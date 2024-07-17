import {Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException, forwardRef, Inject, Logger} from '@nestjs/common'
import {AdminService} from './admin.service'
import {CreateAdminDto} from './dto/create-admin.dto'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'
import {AuthService} from '../auth/auth.service'
import {LoginDto} from './dto/login.dto'
import {PublicRoute} from '../shared/decorators/public-route.decorator'

@Controller('admin')
export class AdminController {
	private readonly logger = new Logger(AdminController.name)
	constructor(
		private adminService: AdminService,
		@Inject(forwardRef(() => AuthService))
		private authService: AuthService
	) {}

	@PublicRoute()
	@Post('register')
	async create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto)
	}

	@PublicRoute()
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		const admin = await this.authService.validateAdmin(loginDto.username, loginDto.password)
		if (!admin) {
			throw new UnauthorizedException('Invalid credentials')
		}
		return this.authService.login(admin)
	}

	@Get('status')
	getStatus(@Request() req) {
		return this.adminService.getStatus(req.user.userId)
	}

	@Get('profile')
	getProfile(@Request() req) {
		return this.adminService.getProfile(req.user.userId)
	}
}
