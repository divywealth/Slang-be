import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { SlangService } from './slang.service';
import { CreateSlangDto } from './dto/create-slang.dto';
import { UpdateSlangDto } from './dto/update-slang.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1'
})
export class SlangController {
  constructor(
    private readonly slangService: SlangService,
    private jwtService: JwtService
    ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async create(@Body() createSlangDto: CreateSlangDto, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      return this.slangService.create(createSlangDto, decodedToken);
    } catch (error) {
      throw error.message
    }
  }

  @Get('slangs')
  findAll() {
    try {
      return this.slangService.findAll();
    } catch (error) {
      throw error.message
    }
  }

  @Get('slang/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.slangService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch('slang/:id')
  update(@Param('id') id: string, @Body() updateSlangDto: UpdateSlangDto) {
    try {
      return this.slangService.update(id, updateSlangDto);
    } catch (error) {
      throw error.message
    }
  }

  @Patch('approve/:id')
  approveSlang(@Param('id') id: string) {
    try {
      return this.slangService.approveSlang(id)
    } catch (error) {
      throw error.message
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.slangService.remove(id);
    } catch (error) {
      throw error.message
    }
  }
}
