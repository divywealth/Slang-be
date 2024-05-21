import { PartialType } from '@nestjs/swagger';
import { CreatePreslangDto } from './create-preslang.dto';

export class UpdatePreslangDto extends PartialType(CreatePreslangDto) {}
