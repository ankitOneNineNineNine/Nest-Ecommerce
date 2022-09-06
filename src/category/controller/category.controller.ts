import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UseGuards,
  Req,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from '../dto/category.dto';
import { CategoryService } from '../service/category.service';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  add(@Req() req, @Body(ValidationPipe) categoryCreateDto: CategoryDto) {
    return this.categoryService.create({
      category: categoryCreateDto,
      userId: req.user.id,
    });
  }

  @Get('/')
  get(@Req() req) {
    return this.categoryService.getAll(req.user.id);
  }

  @Patch('/:id')
  update(
    @Body(ValidationPipe) categoryUpdateDto: any,
    @Param('id') id: string,
  ) {
    return this.categoryService.update({
      category: categoryUpdateDto,
      id,
    });
  }

  @Delete('/:id')
  delete(@Req() req, @Param('id') id: string) {
    return this.categoryService.delete({
      id,
      userId: req.user.id,
    });
  }
}
