import { Test, TestingModule } from '@nestjs/testing';
import { PreslangService } from './preslang.service';

describe('PreslangService', () => {
  let service: PreslangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreslangService],
    }).compile();

    service = module.get<PreslangService>(PreslangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
