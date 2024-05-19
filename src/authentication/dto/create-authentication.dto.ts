import { IsNotEmpty } from 'class-validator';

export class CreateAuthenticationDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  profilePic: string;

  @IsNotEmpty()
  password: string;
}
