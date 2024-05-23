import { Injectable } from '@nestjs/common';
import { CreateSlangDto } from './dto/create-slang.dto';
import { UpdateSlangDto } from './dto/update-slang.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slang } from './entities/slang.entity';
import { Model } from 'mongoose';
import { BadRequest } from 'src/services/BadRequestResponse';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SlangService {
  constructor(
    @InjectModel(Slang.name)
    private readonly slangModel: Model<Slang>,
  ) {}

  async create(createSlangDto: CreateSlangDto, user: User) {
    try {
      console.log(user._id)
      const existingSlang = await this.slangModel.findOne({
        slang: createSlangDto.slang,
        status: { $ne: 'Pending' },
      });
      if (existingSlang) {
        return BadRequest('Slang already exist');
      }
      const newSlang = new this.slangModel({
        ...createSlangDto,
        user: user._id,
      });
      return await newSlang.save();
    } catch (error) {
      throw error.message;
    }
  }

  async findAll() {
    try {
      return this.slangModel.find().populate('user');
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: string) {
    try {
      return this.slangModel.findById(id);
    } catch (error) {
      throw error.message;
    }
  }

  async update(id: string, updateSlangDto: UpdateSlangDto) {
    try {
      return this.slangModel.findByIdAndUpdate({ _id: id }, updateSlangDto, {
        new: true,
      });
    } catch (error) {
      throw error.message;
    }
  }

  async approveSlang(id: string) {
    try {
      return this.slangModel.findByIdAndUpdate(
        { _id: id },
        { status: 'Approved' },
        { new: true },
      );
    } catch (error) {
      throw error.message;
    }
  }

  async remove(id: string) {
    try {
      return this.slangModel.findByIdAndDelete(id)
    } catch (error) {
      throw error.message;
    }
  }

  async getUserPendingSlangs(user: User) {
    try {
      const userPendingSlangs = await this.slangModel.find({
        user: user._id,
        status: { $ne: 'Approved' },
      })
      if (userPendingSlangs.length > 0) {
        return userPendingSlangs
      }
      return []
    } catch (error) {
      throw error.message
    }
  }
  async getUserApprovedSlangs(user: User) {
    try {
      const userApprovedSlangs = await this.slangModel.find({
        user: user._id,
        status: { $ne: 'Pending' },
      })
      if (userApprovedSlangs.length > 0) {
        return userApprovedSlangs
      }
      return []
    } catch (error) {
      throw error.message
    }
  }
}
