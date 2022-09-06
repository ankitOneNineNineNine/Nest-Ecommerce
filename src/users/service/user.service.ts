import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/users.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: { user: UserDto; auth: number }) {
    const newUser = new User();
    newUser.address = createUserDto.user.address;
    newUser.country = createUserDto.user.country;
    newUser.fullname = createUserDto.user.fullname;
    newUser.phone = createUserDto.user.phone;
    newUser.authId = createUserDto.auth;
    try {
      await this.userRepository.save(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }
  async getByAuthId(id: number) {
    try {
      const user = await this.userRepository.find({
        where: {
          authId: id,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getById(id: string) {
    try {
      const user = await this.userRepository.find({
        where: {
          id: +id,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}
