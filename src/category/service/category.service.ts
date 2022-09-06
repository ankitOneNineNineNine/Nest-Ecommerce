import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { CategoryDto } from '../dto/category.dto';
import { UserRole } from '../../users/entity/users.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryBody: { category: CategoryDto; userId: number }) {
    const newCategory = new Category();
    newCategory.name = createCategoryBody.category.name;
    newCategory.description = createCategoryBody.category.description;
    newCategory.userId = createCategoryBody.userId;
    await this.categoryRepository.save(newCategory);
    return 'Category Created';
  }

  async getAll(userId: number) {
    return this.categoryRepository.find({
      where: [
        {
          userId,
        },
        {
          user: {
            role: UserRole.ADMIN,
          },
        },
      ],
    });
  }

  async update(updateCategoryBody: { category: any; id: string }) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: +updateCategoryBody.id,
      },
    });
    if (updateCategoryBody.category.name)
      category.name = updateCategoryBody.category.name;
    if (updateCategoryBody.category.description)
      category.description = updateCategoryBody.category.description;

    await this.categoryRepository.save(category);
    return 'Category Updated';
  }
  async delete(deleteDto: { id: string; userId: number }) {
    if (
      await this.categoryRepository.findOne({
        where: {
          id: +deleteDto.id,
          userId: deleteDto.userId,
        },
      })
    ) {
      await this.categoryRepository.delete(deleteDto.id);
    } else {
      return new HttpException('Not Authorized for deletion', 401);
    }
    return 'Deleted';
  }
}
