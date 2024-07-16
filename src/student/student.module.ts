import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {StudentService} from './student.service'
import {StudentController} from './student.controller'
import {Student, StudentSchema} from './schemas/student.schema'
import {SharedModule} from '../shared/shared.module'

@Module({
	imports: [MongooseModule.forFeature([{name: Student.name, schema: StudentSchema}]), SharedModule],
	providers: [StudentService],
	controllers: [StudentController]
})
export class StudentModule {}
