import { Module } from '@nestjs/common';
import { SlangService } from './slang.service';
import { SlangController } from './slang.controller';

@Module({
  controllers: [SlangController],
  providers: [SlangService]
})
export class SlangModule {}
