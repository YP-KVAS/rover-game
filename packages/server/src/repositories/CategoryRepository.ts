import { CategoryModel } from '../models/CategoryModel'
import type { Transaction } from 'sequelize'

export interface ICategoryRepository {
  save(categoryName: string): Promise<CategoryModel>
  update(category: CategoryModel): Promise<CategoryModel>
  delete(categoryId: number): Promise<void>
  getAll(): Promise<Array<CategoryModel>>
  incrementTopics(categoryId: number, transaction?: Transaction): Promise<void>
}

export class CategoryRepository implements ICategoryRepository {
  async save(categoryName: string): Promise<CategoryModel> {
    try {
      return await CategoryModel.create({ name: categoryName })
    } catch (err) {
      throw new Error('CREATE: Failed to create a new category')
    }
  }

  async update(category: CategoryModel): Promise<CategoryModel> {
    try {
      const categoryToUpdate = await CategoryModel.findOne({
        where: {
          id: category.id,
        },
      })

      if (!categoryToUpdate) {
        throw new Error(`UPDATE: Category with id ${category.id} was not found`)
      }

      categoryToUpdate.name = category.name
      return await categoryToUpdate.save()
    } catch (err) {
      throw new Error(
        `UPDATE: Failed to update category with id ${category.id}`
      )
    }
  }

  async delete(categoryId: number): Promise<void> {
    try {
      const categoryToDelete = await CategoryModel.findOne({
        where: {
          id: categoryId,
        },
      })

      if (!categoryToDelete) {
        throw new Error(`DELETE: Category with id ${categoryId} was not found`)
      }

      await categoryToDelete.destroy()
    } catch (err) {
      throw new Error(`DELETE: Failed to delete category with id ${categoryId}`)
    }
  }

  async getAll(): Promise<Array<CategoryModel>> {
    try {
      return await CategoryModel.findAll({
        order: [['updatedAt', 'DESC']],
      })
    } catch (err) {
      throw new Error('GET: Failed to get all categories')
    }
  }

  async incrementTopics(
    categoryId: number,
    transaction?: Transaction
  ): Promise<void> {
    try {
      await CategoryModel.increment('topicCount', {
        where: { id: categoryId },
        transaction,
      })
    } catch (err) {
      throw new Error(
        `UPDATE: Failed to increment topic count for category with id ${categoryId}`
      )
    }
  }
}
