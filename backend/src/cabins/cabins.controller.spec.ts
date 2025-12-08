import { Test, TestingModule } from '@nestjs/testing';
import { CabinsController } from './cabins.controller';

describe('CabinsController', () => {
  let controller: CabinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CabinsController],
    }).compile();

    controller = module.get<CabinsController>(CabinsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
