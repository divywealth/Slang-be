import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlangService } from './slang.service';
import { CreateSlangDto } from './dto/create-slang.dto';
import { UpdateSlangDto } from './dto/update-slang.dto';

@Controller('slang')
export class SlangController {
  constructor(private readonly slangService: SlangService) {}

  @Post()
  create(@Body() createSlangDto: CreateSlangDto) {
    return this.slangService.create(createSlangDto);
  }

  @Get()
  findAll() {
    return this.slangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlangDto: UpdateSlangDto) {
    return this.slangService.update(+id, updateSlangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slangService.remove(+id);
  }
}
