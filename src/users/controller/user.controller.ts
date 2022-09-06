import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  create(@Req() request, @Body(ValidationPipe) userCreate: UserDto) {
    return this.userService.create({
      user: userCreate,
      auth: request.user.id,
    });
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Get('/')
  me(@Req() request) {
    return this.userService.getById(request.user.id);
  }
}
