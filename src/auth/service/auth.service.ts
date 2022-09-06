import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthLoginDto } from '../dto/login.dto';
import { AuthRegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Auth } from '../entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterCreds: AuthRegisterDto) {
    const newAuth = new Auth();
    newAuth.email = authRegisterCreds.email;
    newAuth.username = authRegisterCreds.username;
    newAuth.password = await bcrypt.hash(authRegisterCreds.password, 10);

    try {
      return await this.authRepository.save(newAuth);
      return 'Signed Up Successfully';
    } catch (e) {
      throw new Error(e);
    }
  }

  async login(authLoginCreds: AuthLoginDto) {
    try {
      const auth = await this.authRepository.findOne({
        where: [
          { email: authLoginCreds.email },
          { username: authLoginCreds.username },
        ],
        select: ['id', 'password', 'username'],
      });
      if (!auth) {
        throw new HttpException('No User Found', 401);
      }
      const allowedCreds = await bcrypt.compare(
        authLoginCreds.password,
        auth.password,
      );

      if (!allowedCreds) {
        throw new HttpException('Incorrect Password', 401);
      }
      return {
        authId: auth.id,
        username: auth.username,
        token: this.jwtService.sign({ id: auth.id }),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async validate(id: number) {
    return await this.authRepository.findOne({
      where: {
        id,
      },
    });
  }
}
