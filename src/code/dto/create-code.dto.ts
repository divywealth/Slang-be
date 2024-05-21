import { IsNotEmpty } from "class-validator";

export class CreateCodeDto {
    @IsNotEmpty()
    email: string
}
