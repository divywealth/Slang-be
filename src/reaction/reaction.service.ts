import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction } from './entities/reaction.entity';
import { User } from 'src/user/entities/user.entity';
import { Slang } from 'src/slang/entities/slang.entity';
import { Model } from 'mongoose';
import { BadRequest } from 'src/services/BadRequestResponse';

@Injectable()
export class ReactionService {
  constructor(
    @InjectModel(Reaction.name)
    private readonly reactionModel: Model<Reaction>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Slang.name)
    private readonly slangModel: Model<Slang>,
  ) {}

  async create(createReactionDto: CreateReactionDto, user: User) {
    try {
      const existingReaction = await this.reactionModel.findOne({
        user: user._id,
        slang: createReactionDto.slang,
      });
      if (existingReaction) {
        return BadRequest('User has reacted already')
      }
      const newReaction = new this.reactionModel({
        slang: createReactionDto.slang,
        user: user._id,
        react: createReactionDto.react
      })
      return newReaction.save()
    } catch (error) {
      throw error.message;
    }
  }

  getSlangLikes(slang: Slang) {
    try {
      const slangLikes = this.reactionModel.find({
        slang: slang._id,
        react: { $ne: 'Dislikes'}
      })
    } catch (error) {
      throw error.message;
    }
  }
  getSlangDislikes(slang: Slang) {
    try {
      const slangDislikes = this.reactionModel.find({
        slang: slang._id,
        react: { $ne: 'like'}
      })
    } catch (error) {
      throw error.message;
    }
  }

  getSlangReaction(slang: Slang) {
    try {
      
    } catch (error) {
      throw error.message;
    }
  }

  findAll() {
    try {
      return this.reactionModel.find()
    } catch (error) {
      throw error.message
    }
  }

  findOne(id: string) {
    try {
      return this.reactionModel.findById(id)
    } catch (error) {
      throw error.message
    }
  }

  update(id: number, updateReactionDto: UpdateReactionDto) {
    return `This action updates a #${id} reaction`;
  }

  remove(id: number) {
    try {

    } catch (error) {
      throw error.message
    }
  }
}
