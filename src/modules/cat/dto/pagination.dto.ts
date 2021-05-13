import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value, key }) => {
    const ret = Number(value);
    if (isNaN(ret)) {
      throw new Error(`${key} should be a number`);
    }
    return ret;
  })
  offset = 0;

  @IsOptional()
  @Transform(({ value, key }) => {
    const ret = Number(value);
    if (isNaN(ret)) {
      throw new Error(`${key} should be a number`);
    }
    return ret;
  })
  limit = 10;
}
