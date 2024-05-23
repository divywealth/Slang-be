import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { Code } from 'src/code/entities/code.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Code.name)
    private readonly codeModel: Model<Code>
  ) {}

  async findAll() {
    try {
      const users =  await this.userModel.find().populate('populatedSlangs');
      return users
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id)
    } catch (error) {
      throw error.message;
    }
  }
}
