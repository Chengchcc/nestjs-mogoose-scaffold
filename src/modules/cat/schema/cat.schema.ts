import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc-fix';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export enum Sex {
  male = 'male',
  female = 'female',
}

@Schema()
export class Cat {
  @Prop()
  _id: number;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ enum: Sex })
  sex: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
export type CatDocument = Cat & Document;

CatSchema.plugin(mongoosePaginate);
CatSchema.plugin(autoIncrement, { model: 'cat', field: '_id', startAt: 1 });
