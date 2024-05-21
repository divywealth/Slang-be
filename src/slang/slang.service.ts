import { Injectable } from '@nestjs/common';
import { CreateSlangDto } from './dto/create-slang.dto';
import { UpdateSlangDto } from './dto/update-slang.dto';

@Injectable()
export class SlangService {
  create(createSlangDto: CreateSlangDto) {
    return 'This action adds a new slang';
  }

  findAll() {
    return `This action returns all slang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slang`;
  }

  update(id: number, updateSlangDto: UpdateSlangDto) {
    return `This action updates a #${id} slang`;
  }

  remove(id: number) {
    return `This action removes a #${id} slang`;
  }
}
