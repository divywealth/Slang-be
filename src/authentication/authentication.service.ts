import { loginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { BadRequest } from 'src/services/BadRequestResponse';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/update-password.dto';
import { CodeService } from 'src/code/code.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly codeService: CodeService,
  ) {}

  async create(createAuthenticationDto: CreateAuthenticationDto) {
    const existingUser = await this.userModel.findOne({
      email: createAuthenticationDto.email,
    });
    if (existingUser) {
      return BadRequest('User has an account');
    } else {
      const saltrounds: number = 10;
      const hashedPassword: string = await bcrypt.hash(
        createAuthenticationDto.password,
        saltrounds,
      );
      const newUser = new this.userModel({
        firstname: createAuthenticationDto.firstname,
        lastname: createAuthenticationDto.lastname,
        email: createAuthenticationDto.email,
        username: createAuthenticationDto.username,
        password: hashedPassword,
      });
      const createdUser = await newUser.save();
      await this.codeService.createCodeForEmail(createdUser.email, createdUser);
      const access_token = await this.jwtService.signAsync({
        user: createdUser,
      });
      return {
        user: newUser,
        access_token: access_token,
      };
    }
  }

  async login(loginUserDto: loginUserDto) {
    if (!loginUserDto.email || !loginUserDto.password) {
      throw BadRequest('email and password required');
    }
    const existingUser = await this.userModel.findOne({
      email: loginUserDto.email,
    });
    if (!existingUser) {
      throw BadRequest('email dosent have an account try signing up');
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw BadRequest('Wrong Password');
    }
    if (existingUser.status === 'Not Verified') {
      await this.codeService.createCodeForEmail(existingUser.email, existingUser);
    }
    return {
      user: existingUser,
      access_token: this.jwtService.sign({ user: existingUser }),
    };
  }

  registerUserWithGoogle() {}

  registerUserWithFacebook() {}

  async updatePassword(updatePasswordDto: UpdatePasswordDto, user: User) {
    if (!(await bcrypt.compare(updatePasswordDto.password, user.password))) {
      throw BadRequest('Wrong Password');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      saltRounds,
    );
    return this.userModel.findOneAndUpdate(
      { _id: user._id },
      { password: hashedPassword },
      { new: true },
    );
  }

  async updateEmail(email: string, user: User) {
    const updateEmail = await this.userModel.findByIdAndUpdate(
      user._id,
      { email: email },
      { new: true },
    );
    if (updateEmail) {
      return updateEmail;
    }
    throw BadRequest('email not updated');
  }

  async updateUsername(username: string, user: User) {
    const updateUsername = this.userModel.findByIdAndUpdate(
      user._id,
      { username: username },
      { new: true },
    );
    if (updateUsername) {
      return updateUsername;
    }
    throw BadRequest('username not updated');
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (!resetPasswordDto.password) {
      return BadRequest('Password is required');
    }
    if (resetPasswordDto.password.length < 5) {
      return BadRequest('Password is too short. Atleast 6 characters required');
    }
    const saltOrRounds = 10;
    const password = await bcrypt.hash(resetPasswordDto.password, saltOrRounds);
    return await this.userModel.findOneAndUpdate(
      { email: resetPasswordDto.email },
      { password: password },
    );
  }

  async updateProfilepic(user: User, file: Express.Multer.File) {
    console.log(file);
    const uploadImage = await this.cloudinaryService.uploadImage(file);
    console.log(uploadImage.url);
    const update = this.userModel.findByIdAndUpdate(
      user._id,
      {
        profilepic: uploadImage.url,
      },
      { new: true },
    );
    if (!update) {
      return BadRequest('Not updated');
    }
    console.log(update)
    return update;
  }
  // update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return `This action updates a #${id} authentication`;
  // }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async verifyUser(user: User) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser.status === 'Not Verified') {
      return await this.userModel.findOneAndUpdate(
        { email: user.email },
        { status: 'Verified' },
        { new: true },
      ); 
    }
    return existingUser;
  }
}
