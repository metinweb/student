import {Model, Document} from 'mongoose'

export class GenericRepository<T extends Document> {
	constructor(protected readonly model: Model<T>) {}

	async findAll(): Promise<T[]> {
		return this.model.find().exec()
	}

	async findById(id: string): Promise<T> {
		return this.model.findById(id).exec()
	}

	async create(item: Partial<T>): Promise<T> {
		return this.model.create(item)
	}

	async update(id: string, item: Partial<T>): Promise<T> {
		return this.model.findByIdAndUpdate(id, item, {new: true}).exec()
	}

	async delete(id: string): Promise<void> {
		await this.model.findByIdAndDelete(id).exec()
	}
}
