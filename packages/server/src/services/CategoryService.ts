import { CategoryModel } from '../models/CategoryModel'
import { CategoryRepository } from '../repositories/CategoryRepository'

const categoryRepository = new CategoryRepository()

export class CategoryService {
  async findAll(): Promise<Array<CategoryModel>> {
    return await categoryRepository.getAll()
  }

  async create(name: string): Promise<CategoryModel> {
    return await categoryRepository.save(name)
  }

  async update(id: number, name: string): Promise<CategoryModel> {
    const categoryToUpdate = new CategoryModel()
    categoryToUpdate.id = id
    categoryToUpdate.name = name

    return await categoryRepository.update(categoryToUpdate)
  }

  async delete(id: number): Promise<void> {
    return await categoryRepository.delete(id)
  }
}
