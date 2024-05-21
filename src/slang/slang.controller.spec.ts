import { Test, TestingModule } from '@nestjs/testing';
import { SlangController } from './slang.controller';
import { SlangService } from './slang.service';

describe('SlangController', () => {
  let controller: SlangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlangController],
      providers: [SlangService],
    }).compile();

    controller = module.get<SlangController>(SlangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
