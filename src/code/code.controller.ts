import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1'
})
export class CodeController {
  constructor(
    private readonly codeService: CodeService,
    private jwtService: JwtService
    ) {}

  @Get('verify-code')
  async verifyCode(@Body() code: string, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      return this.codeService.verifyCode(code, decodedToken)
    } catch (error) {
      throw error.message;
    }
  }

  @Post()
  async createCodeForEmail(@Body() email: string, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
        const decodedToken = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET
        })
        const userId = decodedToken
      return this.codeService.createCodeForEmail(email, userId);
    } catch (error) {
      throw error.message
    }
  }

  @Post()
  async createCodeForPassword(@Body() email: string) {
    try {
      return this.codeService.createCodeForPassword(email)
    } catch (error) {
      throw error.message
    }
  }

  // @Get()
  // findAll() {
  //   return this.codeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.codeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
  //   return this.codeService.update(+id, updateCodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.codeService.remove(+id);
  // }
}
