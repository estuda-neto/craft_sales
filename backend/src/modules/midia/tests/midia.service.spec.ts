import { Test, TestingModule } from '@nestjs/testing';
import { MidiaService } from '../midia.service';

describe('MidiaService', () => {
  let service: MidiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidiaService],
    }).compile();

    service = module.get<MidiaService>(MidiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
