import { Test, TestingModule } from '@nestjs/testing';
import { PreslangController } from './preslang.controller';
import { PreslangService } from './preslang.service';

describe('PreslangController', () => {
  let controller: PreslangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreslangController],
      providers: [PreslangService],
    }).compile();

    controller = module.get<PreslangController>(PreslangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
