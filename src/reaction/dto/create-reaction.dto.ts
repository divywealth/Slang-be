import { IsNotEmpty } from "class-validator";
import { React } from "../entities/reaction.entity";

export class CreateReactionDto {

    @IsNotEmpty()
    slang: string

    @IsNotEmpty()
    react: React
}
