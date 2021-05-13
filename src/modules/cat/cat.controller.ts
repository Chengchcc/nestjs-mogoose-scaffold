import { Body, Controller, Get, Post, Logger, Query } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';
import { FilterDto } from './dto/filter.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('cat')
export class CatController {
  private readonly logger = new Logger('cat');

  constructor(private readonly catService: CatService) {}

  @Post('create')
  async create(@Body() cat: CatDto) {
    return await this.catService.putCat(cat);
  }

  @Post('update')
  async update(@Body('cat') cat: CatDto, @Body('id') id: number) {
    return await this.catService.updateCat(cat, id);
  }

  @Get('detail')
  async detail(@Query('id') id: number) {
    console.log('id', id);
    return await this.catService.getCat(id);
  }

  @Get('get-all')
  async all(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: FilterDto,
  ) {
    this.logger.log('get-all --' + JSON.stringify(paginationDto));
    return await this.catService.getAllCats(paginationDto, filterDto);
  }
}
