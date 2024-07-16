import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Admin, AdminDocument} from './schemas/admin.schema'
import {CreateAdminDto} from './dto/create-admin.dto'
import {UserActivityService} from '../user-activity/user-activity.service'

@Injectable()
export class AdminService {
	constructor(
		@InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
		private userActivityService: UserActivityService
	) {}

	async create(createAdminDto: CreateAdminDto): Promise<Admin> {
		const createdAdmin = new this.adminModel(createAdminDto)
		await this.userActivityService.logActivity('Admin created', createdAdmin._id as string)
		return createdAdmin.save()
	}

	async findByUsername(username: string): Promise<Admin | undefined> {
		return this.adminModel.findOne({username}).exec()
	}

	async getStatus(adminId: string) {
		const admin = await this.adminModel.findById(adminId).exec()
		if (!admin) {
			throw new NotFoundException('Admin not found')
		}
		await this.userActivityService.logActivity('Admin status checked', adminId)
		return {
			isActive: true,
			lastLogin: admin.lastLogin as Date
		}
	}

	async getProfile(adminId: string) {
		const admin = await this.adminModel.findById(adminId).exec()
		if (!admin) {
			throw new NotFoundException('Admin not found')
		}
		await this.userActivityService.logActivity('Admin profile viewed', adminId)
		return {
			username: admin.username,
			permissions: admin.permissions
		}
	}

	async updateLastLogin(adminId: string): Promise<void> {
		const updatedAdmin = await this.adminModel.findByIdAndUpdate(adminId, {$set: {lastLogin: new Date()}}, {new: true}).exec()

		if (!updatedAdmin) {
			throw new NotFoundException(`Admin with id ${adminId} not found`)
		}
	}
}
