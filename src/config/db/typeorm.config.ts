import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from '../../auth/entity/auth.entity';
import { Category } from '../../category/entity/category.entity';
import { User } from '../../users/entity/users.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ankit',
  database: 'ecommercelearning',
  // entities: ['dist/**/entity/*.entity.js'],
  entities: [Auth, User, Category],
  synchronize: true,
};
