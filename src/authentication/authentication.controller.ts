import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { loginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto, UpdatePasswordDto } from './dto/update-password.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller({
  version: '1',
})
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService
    ) {}

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
      return this.authenticationService.updatePassword(updatePasswordDto, decodedUser)
    } catch (error) {
      throw error.message
    }
  }

  @Put('update-email')
  async updateEmail(@Req() request: Request, @Body() email: string) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      return this.authenticationService.updateEmail(email, decodedUser)
    } catch (error) {
      throw error.message
    }
  }

  // @Patch(':id')
  // updatePhoneNo() {
    
  // }

  @Patch(':id')
  async updateProfilePic() {
    try {

    } catch (error) {
      throw error.message;
    }
  }

  @Put('update-username')
  async updateUsername(@Body() username: string, @Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '')
      const decodedUser = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      })
      return this.authenticationService.updateUsername(username, decodedUser)
    } catch (error) {
      throw error.message
    }
  }

  @Put('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      return this.authenticationService.resetPassword(resetPasswordDto)
    } catch (error) {
      throw error.message
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authenticationService.remove(+id);
  }
}
