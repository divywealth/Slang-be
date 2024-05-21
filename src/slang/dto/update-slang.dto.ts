import { PartialType } from '@nestjs/swagger';
import { CreateSlangDto } from './create-slang.dto';

export class UpdateSlangDto extends PartialType(CreateSlangDto) {}
