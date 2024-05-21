import { Test, TestingModule } from '@nestjs/testing';
import { SlangService } from './slang.service';

describe('SlangService', () => {
  let service: SlangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlangService],
    }).compile();

    service = module.get<SlangService>(SlangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
