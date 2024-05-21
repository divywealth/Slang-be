import { IsNotEmpty, IsString, IsUppercase } from "class-validator";
import { Status } from "../entities/slang.entity";

export class CreateSlangDto {
    @IsNotEmpty()
    @IsUppercase()
    @IsString()
    slang: string;

    @IsNotEmpty()
    @IsString()
    meaning: string;
}
