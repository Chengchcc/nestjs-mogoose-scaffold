import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Sex } from '../schema/cat.schema';

export class CatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsEnum(Sex)
  sex: Sex;
}
