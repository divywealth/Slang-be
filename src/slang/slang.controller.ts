import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { SlangService } from './slang.service';
import { CreateSlangDto } from './dto/create-slang.dto';
import { UpdateSlangDto } from './dto/update-slang.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller({
  version: '1',
})
export class SlangController {
  constructor(
    private readonly slangService: SlangService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('slang')
  @UsePipes(ValidationPipe)
  async create(
    @Body() createSlangDto: CreateSlangDto,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userToken = decodedToken.user._id;
      const user = await this.userService.findOne(userToken)
      return this.slangService.create(createSlangDto, user);
    } catch (error) {
      throw error.message;
    }
  }

  @Get('slangs')
  findAll() {
    try {
      return this.slangService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @Get('slang')
  findSlang(@Body('slang') slang: string) {
    try {
      return this.slanService.findSlang(slang)
    } catch (error) {
      throw error.message
    }
  }

  @Get('slang/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.slangService.findOne(id);
    } catch (error) {
      throw error.message;
    }
  }

  @Patch('slang/:id')
  update(@Param('id') id: string, @Body() updateSlangDto: UpdateSlangDto) {
    try {
      return this.slangService.update(id, updateSlangDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Patch('approve/:id')
  approveSlang(@Param('id') id: string) {
    try {
      return this.slangService.approveSlang(id);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('slang/:id')
  remove(@Param('id') id: string) {
    try {
      return this.slangService.remove(id);
    } catch (error) {
      throw error.message;
    }
  }

  @Get('users/:userId/approvedslangs')
  async getuserApprovedSlangs(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const newdecodeToken = decodedToken.user._id;
      userId = newdecodeToken;
      const user = await this.userService.findOne(newdecodeToken)
      return this.slangService.getUserApprovedSlangs(user)
  }

  @Get('users/:userId/pendingslangs')
  async getuserPendingSlangs(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const newdecodeToken = decodedToken.user._id;
      userId = newdecodeToken;
      const user = await this.userService.findOne(newdecodeToken)
      return this.slangService.getUserPendingSlangs(user)
  }
}
