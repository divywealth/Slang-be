import { Injectable } from '@nestjs/common';
import { CreatePreslangDto } from './dto/create-preslang.dto';
import { UpdatePreslangDto } from './dto/update-preslang.dto';

@Injectable()
export class PreslangService {
  create(createPreslangDto: CreatePreslangDto) {
    return 'This action adds a new preslang';
  }

  findAll() {
    return `This action returns all preslang`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preslang`;
  }

  update(id: number, updatePreslangDto: UpdatePreslangDto) {
    return `This action updates a #${id} preslang`;
  }

  remove(id: number) {
    return `This action removes a #${id} preslang`;
  }
}
