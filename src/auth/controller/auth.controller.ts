import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthLoginDto } from '../dto/login.dto';
import { AuthRegisterDto } from '../dto/register.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) authRegisterCreds: AuthRegisterDto) {
    return this.authService.register(authRegisterCreds);
  }

  @Post('/login')
  login(@Body(ValidationPipe) authLoginCreds: AuthLoginDto) {
    return this.authService.login(authLoginCreds);
  }
}
