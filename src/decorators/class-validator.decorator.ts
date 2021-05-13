import { Transform } from 'class-transformer';

const DefaultValueDecorator = (defaultValue: any) => {
  return Transform((target: any) => {
    console.log('xxxx');
    return target || defaultValue;
  });
};

export default DefaultValueDecorator;
