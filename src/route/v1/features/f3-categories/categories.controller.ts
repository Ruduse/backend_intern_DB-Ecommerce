import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import CategoriesService from './categories.service';
import CreateCategoriesDto from './dto/create-categories.dto';
import UpdateCategoriesDto from './dto/update-categories.dto';

@ApiTags('Categories')
@UseInterceptors(WrapResponseInterceptor)
@Controller('v1/categories')
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    return this.categoriesService.findManyBy(query);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateCategoriesDto): Promise<any> {
    return this.categoriesService.create(body);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateCategoriesDto,
  ): Promise<any> {
    return this.categoriesService.updateOneById(id, body);
  }

  @Delete(':ids')
  @HttpCode(200)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const objectIds = ids.split(',').map((item) => new Types.ObjectId(item));
    return this.categoriesService.deleteManyHardByIds(objectIds);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return this.categoriesService.deleteOneHardById(id);
  }

  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.categoriesService.paginate(query);
  }

  @Get('one')
  @HttpCode(200)
  async findOneBy(
    @ApiQueryParams() { filter, projection }: AqpDto,
  ): Promise<any> {
    return this.categoriesService.findOneBy(filter, { filter, projection });
  }

  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.categoriesService.findOneById(id, { populate });
    if (!result) throw new NotFoundException('The item does not exist');
    return result;
  }
}
