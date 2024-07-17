import {Controller, Get, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common'
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard'
import {StudentService} from './student.service'
import {CreateStudentDto} from './dto/create-student.dto'
import {UpdateStudentDto} from './dto/update-student.dto'

@Controller('students')
export class StudentController {
	constructor(private readonly StudentService: StudentService) {}

	@Post()
	create(@Body() createStudentDto: CreateStudentDto) {
		return this.StudentService.create(createStudentDto)
	}

	@Get()
	findAll() {
		return this.StudentService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.StudentService.findOne(id)
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
		return this.StudentService.update(id, updateStudentDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.StudentService.remove(id)
	}
}
