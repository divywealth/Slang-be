import { NotificationService } from './../services/NotificationService';
import { randomNumber } from './../services/randomNumber';
import { Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Code } from './entities/code.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { BadRequest } from 'src/services/BadRequestResponse';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as mongoose from 'mongoose';

@Injectable()
export class CodeService {
  constructor (
    @InjectModel(Code.name)
    private readonly codeModel: mongoose.Model<Code>,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    
    private readonly notificationService: NotificationService
  ) {}

  
  async createCodeForEmail(email: string, user: User) {
      console.log(email)
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
        htmlContent: `<h1>Hello ${user.firstname} your verification code is ${code}</h1>`,
      };
      console.log(emailPayload)
      const sentEmail = await this.notificationService.emailNotificationService(emailPayload)
      console.log(sentEmail)
      return await createdCode.save()

  }
  // Check this guy well

  async createCodeForPassword(email: string) {
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
        htmlContent: `<h1>Hello ${existingUser.firstname} your verification code is ${code}</h1>`,
      };
      await this.notificationService.emailNotificationService(emailPayload)
      return await createdCode.save()
  }

  async verifyCode (code: string, user: User) {
      const existingCode = await this.codeModel.findOne({
        user: user._id,
        code: code
      })
      if(!existingCode) {
        throw BadRequest('invalid code')
      }
      return 'Code correct'
  } //Check this well

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const expiredCodes = await this.codeModel.find({
      createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) },
    }).exec();

    if (expiredCodes.length > 0) {
      await this.codeModel.deleteMany({ _id: { $in: expiredCodes.map(code => code._id) } }).exec();
    }
  }
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
      return this.codeModel.findOneAndDelete({user: user})
  }
}
