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
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthenticationDto: CreateAuthenticationDto) {
    try {
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
        const information2save = {
          firstname: createAuthenticationDto.firstname,
          lastname: createAuthenticationDto.lastname,
          email: createAuthenticationDto.email,
          username: createAuthenticationDto.username,
          password: hashedPassword,
        };
        const createUser = new this.userModel(information2save);
        const newUser = await createUser.save();
        return {
          user: newUser,
          access_token: await this.jwtService.signAsync({ newUser }),
        };
      }
    } catch (error) {
      throw error.message;
    }
  }

  async login(loginUserDto: loginUserDto) {
    try {
      if (!loginUserDto.email || !loginUserDto.password) {
        throw BadRequest('email and password required');
      }
      const existingUser = await this.userModel.findOne({
        email: loginUserDto.email,
      });
      if (!existingUser) {
        throw BadRequest('email dosent have an account try signing up');
      }
      if (
        !(await bcrypt.compare(loginUserDto.password, existingUser.password))
      ) {
        throw BadRequest('Wrong Password');
      }
      return {
        user: existingUser,
        access_token: this.jwtService.sign({ user: existingUser }),
      };
    } catch (error) {
      throw error.message;
    }
  }

  registerUserWithGoogle() {}

  registerUserWithFacebook() {}

  async updatePassword( updatePasswordDto: UpdatePasswordDto, user: User) {
    try {
      if (!(await bcrypt.compare(updatePasswordDto.password, user.password))) {
        throw BadRequest("Wrong Password")
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updatePasswordDto.newPassword,
        saltRounds,
      );
      return this.userModel.findOneAndDelete({id: user.id}, { password: hashedPassword })
    } catch (error) {
      throw error.message
    }
  }

  async updateEmail(email: string, user: User) {
    try {
      
    } catch (error) {
      throw error.message
    }
  }

  async updateUsername(username: string, userId: number) {
    try {
      this.userModel.findByIdAndUpdate({userId}, {username: username})
    } catch (error) {
      throw error.message
    }
  }

  async sendCode () {
    try {
      
    } catch (error) {
      throw error.message
    }
  }

  async verifyCode () {
    try {
      
    } catch (error) {
      throw error.message
    }
  }

  async resetPassword() {
    try {
      
    } catch (error) {
      throw error.message
    }
  }

  // update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return `This action updates a #${id} authentication`;
  // }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
