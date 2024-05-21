import { Module } from '@nestjs/common';
import { PreslangService } from './preslang.service';
import { PreslangController } from './preslang.controller';

@Module({
  controllers: [PreslangController],
  providers: [PreslangService]
})
export class PreslangModule {}
