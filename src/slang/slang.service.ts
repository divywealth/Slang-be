import { BadRequest } from './../services/BadRequestResponse';
import { Injectable } from '@nestjs/common';
import { CreateSlangDto } from './dto/create-slang.dto';
import { UpdateSlangDto } from './dto/update-slang.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Slang } from './entities/slang.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SlangService {
  constructor(
    @InjectModel(Slang.name)
    private readonly slangModel: Model<Slang>,
  ) {}

  async create(createSlangDto: CreateSlangDto, user: User) {
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
  }

  async findAll() {
    return this.slangModel.find().populate('user');
  }

  async findOne(id: string) {
    return this.slangModel.findById(id).populate('user');
  }

  async findSlang(slang: string) {
    const existingSlang = await this.slangModel
      .findOne({ slang: slang, status: { $ne: 'Pending' } })
      .populate('user');
    if (!existingSlang) {
      return BadRequest(
        `Slang not available you can try adding the slang if you know the meaning.`,
      );
    }
    return existingSlang;
  }

  async update(id: string, updateSlangDto: UpdateSlangDto) {
    return this.slangModel.findByIdAndUpdate({ _id: id }, updateSlangDto, {
      new: true,
    });
  }

  async approveSlang(id: string) {
    const update = await this.slangModel.findByIdAndUpdate(
      { _id: id },
      { status: 'Approved' },
      { new: true },
    );
    const deleteOthers = await this.slangModel.deleteMany({
      slang: update.slang,
      status: { $ne: 'Approved' },
    });
    return update;
  }

  async remove(id: string) {
    return this.slangModel.findByIdAndDelete(id);
  }

  async getUserPendingSlangs(user: User) {
    const userPendingSlangs = await this.slangModel.find({
      user: user._id,
      status: { $ne: 'Approved' },
    });
    if (userPendingSlangs.length > 0) {
      return userPendingSlangs;
    }
    return 'User has no pending slang';
  }

  async getUserApprovedSlangs(user: User) {
    const userApprovedSlangs = await this.slangModel.find({
      user: user._id,
      status: { $ne: 'Pending' },
    });
    if (userApprovedSlangs.length > 0) {
      return userApprovedSlangs;
    }
    return 'User has not added any slang yet';
  }

  async getPendingSlangs() {
    return this.slangModel.find({ status: 'Pending' });
  }
}
