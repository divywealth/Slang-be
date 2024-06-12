import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthenticationDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address'})
  email: string;

  @IsNotEmpty()
  username: string;

  profilePic: string;

  @IsNotEmpty()
  password: string;
}
