import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Student, StudentDocument} from './schemas/student.schema'
import {CreateStudentDto} from './dto/create-student.dto'
import {UpdateStudentDto} from './dto/update-student.dto'
import {AwsSesService} from '../shared/services/aws-ses.service'

@Injectable()
export class StudentService {
	constructor(
		@InjectModel(Student.name) private studentModel: Model<StudentDocument>,
		private awsSesService: AwsSesService
	) {}

	async create(createStudentDto: CreateStudentDto): Promise<Student> {
		const createdStudent = new this.studentModel(createStudentDto)
		const savedStudent = await createdStudent.save()
		await this.awsSesService.sendEmail(savedStudent.email, 'Welcome to Our School', `Dear ${savedStudent.name}, welcome to our school!`)
		return savedStudent
	}

	async findAll(): Promise<Student[]> {
		return this.studentModel.find().exec()
	}

	async findOne(id: string): Promise<Student> {
		const student = await this.studentModel.findById(id).exec()
		if (!student) {
			throw new NotFoundException(`Student with ID "${id}" not found`)
		}
		return student
	}

	async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
		const updatedStudent = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, {new: true}).exec()
		if (!updatedStudent) {
			throw new NotFoundException(`Student with ID "${id}" not found`)
		}
		return updatedStudent
	}

	async remove(id: string): Promise<Student> {
		const deletedStudent = await this.studentModel.findOneAndDelete({_id: id}).exec()
		if (!deletedStudent) {
			throw new NotFoundException(`Student with ID "${id}" not found`)
		}
		return deletedStudent
	}
}
