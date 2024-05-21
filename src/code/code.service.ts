import { NotificationService } from './../services/NotificationService';
import { randomNumber } from './../services/randomNumber';
import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Code } from './entities/code.entity';
import mongoose, { mongo } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { BadRequest } from 'src/services/BadRequestResponse';

@Injectable()
export class CodeService {
  constructor (
    @InjectModel(Code.name)
    private codeModel: mongoose.Model<Code>,
    private userModel: mongoose.Model<User>,
    private readonly notificationService: NotificationService
  ) {}

  async createCodeForEmail(email: string, user: User) {
    try {
      const code = randomNumber(6);
      const existingUserCode =  await this.codeModel.findOne({user: user._id})
      if (existingUserCode) {
        await this.codeModel.deleteOne({_id: existingUserCode._id})
      }
      const createdCode = new this.codeModel({
        user: user._id,
        code: code
      })
      const emailPayload = {
        to: email,
        subject: 'Slang Reset Password',
        from: 'christianonuora1@gmail.com',
        text: 'Hello World from Slang.com',
        html: `<h1>Hello ${user.firstname} your verification code is ${code}</h1>`,
      };
      await this.notificationService.emailNotificationService(emailPayload)
      return await createdCode.save()

    } catch (error) {
      throw error.message
    }
  }// Check this guy well

  async createCodeForPassword(email: string) {
    try {
      const existingUser = await this.userModel.findOne({email: email})
      if (!existingUser) {
        throw BadRequest("email dosen't have an account")
      }
      const existingUserCode =  await this.codeModel.findOne({user: existingUser._id})
      if(existingUserCode) {
        await this.codeModel.deleteOne({_id: existingUserCode._id})
      }
      const code = randomNumber(6);
      const createdCode = new this.codeModel({
        user: existingUser._id,
        code: code
      })
      const emailPayload = {
        to: email,
        subject: 'Slang Reset Password',
        from: 'christianonuora1@gmail.com',
        text: 'Hello World from Slang.com',
        html: `<h1>Hello ${existingUser.firstname} your verification code is ${code}</h1>`,
      };
      await this.notificationService.emailNotificationService(emailPayload)
      return await createdCode.save()
    } catch (error) {
      throw error.message
    }
  }

  async verifyCode (code: string, user: User) {
    try {
      const existingCode = await this.codeModel.findOne({
        user: user._id,
        code: code
      })
      if(!existingCode) {
        throw BadRequest('invalid code')
      }
      return 'Code correct'
    } catch (error) {
      throw error.message
    }
  } //Check this well

  // findAll() {
  //   return `This action returns all code`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} code`;
  // }

  // update(id: number, updateCodeDto: UpdateCodeDto) {
  //   return `This action updates a #${id} code`;
  // }

  // remove(id: number) {
  //   try {
      
  //   } catch (error) {
  //     throw error.message
  //   }
  // }

  removeUserCode(user: string) {
    try {
      return this.codeModel.findOneAndDelete({user: user})
    } catch (error) {
      throw error.message
    }
  }
}
