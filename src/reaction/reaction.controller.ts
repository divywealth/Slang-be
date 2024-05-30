import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { SlangService } from 'src/slang/slang.service';

@Controller({
  version: '1'
})
export class ReactionController {
  constructor(
    private readonly reactionService: ReactionService,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly slangService: SlangService,
  ) {}

  @Post('reaction')
  async create(@Body() createReactionDto: CreateReactionDto, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userToken = decodedToken.user._id;
      const user = await this.userService.findOne(userToken)
      return this.reactionService.create(createReactionDto, user);
    } catch (error) {
      throw error.message
    }
  }

  @Get('reactions')
  findAll() {
    try {
      return this.reactionService.findAll();
    } catch (error) {
      throw error.message
    }
  }

  @Get('slang/:slangId/likes')
  async getSlangLikes(@Param('slangId') slangId: string) {
    try {
      const slang = await this.slangService.findOne(slangId)
    return this.reactionService.getSlangLikes(slang)
    } catch (error) {
      throw error.message
    }
  }

  @Get('slang/:slangId/dislikes')
  async getSlangDislikes(@Param('slangId') slangId: string) {
    const slang = await this.slangService.findOne(slangId)
    return this.reactionService.getSlangDislikes(slang)
  }

  @Get('reaction/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.reactionService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    try {
      return this.reactionService.update(+id, updateReactionDto);
    } catch (error) {
      throw error.message
    }
  }

  @Delete('reaction/:id')
  remove(@Param('id') id: string) {
    try {
      return this.reactionService.remove(+id);
    } catch (error) {
      throw error.message
    }
  }
}
