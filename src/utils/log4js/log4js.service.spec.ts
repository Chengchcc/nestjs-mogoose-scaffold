import { Test, TestingModule } from '@nestjs/testing';
import { Log4jsService } from './log4js.service';

describe('Log4jsService', () => {
  let service: Log4jsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Log4jsService],
    }).compile();

    service = module.get<Log4jsService>(Log4jsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
