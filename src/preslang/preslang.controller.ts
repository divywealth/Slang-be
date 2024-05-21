import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreslangService } from './preslang.service';
import { CreatePreslangDto } from './dto/create-preslang.dto';
import { UpdatePreslangDto } from './dto/update-preslang.dto';

@Controller('preslang')
export class PreslangController {
  constructor(private readonly preslangService: PreslangService) {}

  @Post()
  create(@Body() createPreslangDto: CreatePreslangDto) {
    return this.preslangService.create(createPreslangDto);
  }

  @Get()
  findAll() {
    return this.preslangService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preslangService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreslangDto: UpdatePreslangDto) {
    return this.preslangService.update(+id, updatePreslangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preslangService.remove(+id);
  }
}
