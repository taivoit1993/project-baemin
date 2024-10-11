import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BaseController } from 'src/common/restApi/base.controller';
import { Category } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoryController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(private readonly categoryService: CategoryService) {
    super(categoryService);
  }
  
  
}
