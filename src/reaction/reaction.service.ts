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
      const existingReaction = await this.reactionModel.findOne({
        user: user._id,
        slang: createReactionDto.slang,
      });
      if (existingReaction) {
        await this.reactionModel.deleteOne({_id: existingReaction._id})
      }
      const newReaction = new this.reactionModel({
        slang: createReactionDto.slang,
        user: user._id,
        react: createReactionDto.react
      })
      return newReaction.save()
  }

  getSlangLikes(slang: Slang) {
      const slangLikes = this.reactionModel.find({
        slang: slang._id,
        react: { $ne: 'Dislikes'}
      })
      if (slangLikes) {
        return slangLikes
      }
      return 'Slang has no likes'
  }
  getSlangDislikes(slang: Slang) {
      const slangDislikes = this.reactionModel.find({
        slang: slang._id,
        react: { $ne: 'like'}
      })
      if ( slangDislikes ) {
        return slangDislikes
      }
      return 'Slang has no dislikes'
  }

  getSlangReaction(slang: Slang) {
    try {
      
    } catch (error) {
      throw error.message;
    }
  }

  findAll() {
      return this.reactionModel.find()
  }

  findOne(id: string) {
      return this.reactionModel.findById(id)
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
