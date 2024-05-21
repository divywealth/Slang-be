import { Module } from '@nestjs/common';
import { SlangService } from './slang.service';
import { SlangController } from './slang.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Slang, SlangSchema } from './entities/slang.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Slang.name, schema: SlangSchema }
    ])
  ],
  controllers: [SlangController],
  providers: [SlangService]
})
export class SlangModule {}
