import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { loginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/update-password.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload-dto.dto';
import { UserService } from 'src/user/user.service';

@Controller({
  version: '1',
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
    private readonly userService: UserService
    ) {}
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'some description',
      type: FileUploadDto
    })


  @Post('user')
  @UsePipes(ValidationPipe)
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    try {
      return this.authenticationService.create(createAuthenticationDto);
    } catch (error) {
      throw error.message
    }
  }

  @Post('login')
  login(@Body() loginUserDto: loginUserDto) {
    try {
      return this.authenticationService.login(loginUserDto);
    } catch (error) {
      throw error.message
    }
  }
  
  @Post()
  loginWithGoogle() {
    return this.authenticationService.registerUserWithGoogle()
  }

  @Post()
  loginWithFacebook() {
    return this.authenticationService.registerUserWithFacebook()
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return this.authenticationService.update(+id, updateAuthenticationDto);
  // }
  
  @Put('update-password')
  @UsePipes(ValidationPipe)
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedUser.user._id;
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updatePassword(updatePasswordDto, existingUser)
    } catch (error) {
      throw error.message
    }
  }

  @Put('update-email')
  async updateEmail(@Req() request: Request, @Body('email') email: string) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userId = decodedUser.user._id
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updateEmail(email, existingUser)
    } catch (error) {
      throw error.message
    }
  }

  // @Patch(':id')
  // updatePhoneNo() {
    
  // }

  @Patch('update-profilepic')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfilePic(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userId = decodedUser.user._id
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updateProfilepic(existingUser, file)
    } catch (error) {
      throw error.message;
    }
  }

  @Put('update-username')
  async updateUsername(@Body('username') username: string, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userId = decodedUser.user._id
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.updateUsername(username, existingUser)
    } catch (error) {
      throw error.message
    }
  }

  @Put('reset-password')
  @UsePipes(ValidationPipe)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.resetPassword(resetPasswordDto)
    } catch (error) {
      throw error.message
    }
  }

  @Delete('user/:id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(id);
  }

  @Patch('verify-user')
  async verifyUser(@Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      const userId = decodedUser.user._id
      const existingUser = await this.userService.findOne(userId);
      return this.authenticationService.verifyUser(existingUser)
    } catch (error) {
      throw error.message
    }
  }

  @Patch('update-user/:id')
  async updateUserToAdmin(@Param('id') id: string) {
    try {
      return this.authenticationService.updateUserToAdmin(id)
    } catch (error) {
      throw error.massage;
    }
  }
}
