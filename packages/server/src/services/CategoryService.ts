import { CategoryModel } from '../models/CategoryModel'
import type { ICategoryRepository } from '../repositories/CategoryRepository'
import { CategoryRepository } from '../repositories/CategoryRepository'
import type { CategoryDTO } from '../utils/types/dto'
import { getCategoryDTOFromModel } from '../utils/types/dto'

export class CategoryService {
  constructor(private _categoryRepository: ICategoryRepository) {}

  async findAll(): Promise<CategoryDTO[]> {
    const categories = await this._categoryRepository.getAll()
    return categories.map(category => getCategoryDTOFromModel(category))
  }

  async create(name: string): Promise<CategoryModel> {
    return await this._categoryRepository.save(name)
  }

  async update(id: number, name: string): Promise<CategoryModel> {
    const categoryToUpdate = new CategoryModel()
    categoryToUpdate.id = id
    categoryToUpdate.name = name

    return await this._categoryRepository.update(categoryToUpdate)
  }

  async delete(id: number): Promise<void> {
    return await this._categoryRepository.delete(id)
  }
}

export const categoryService = new CategoryService(new CategoryRepository())
