import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CatDocument } from './schema/cat.schema';
import { PaginateModel } from 'mongoose';
import { PaginationDto } from './dto/pagination.dto';
import { FilterDto } from './dto/filter.dto';
import { CatDto } from './dto/cat.dto';
import { omit } from 'lodash';

@Injectable()
export class CatService {
  constructor(
    @InjectModel('cat') private readonly catModel: PaginateModel<CatDocument>,
  ) {}

  private normalize(doc: CatDocument) {
    if (doc) {
      return Object.assign(omit(doc.toJSON(), ['_id', '__v']), { id: doc._id });
    } else {
      return {};
    }
  }

  async getCat(id: number) {
    const cat = await this.catModel.findOne({ _id: id });
    return this.normalize(cat);
  }

  async getAllCats(paginationDto: PaginationDto, filter: FilterDto) {
    const query = {
      name: { $regex: filter.name },
    };

    const pagination = {
      offset: paginationDto.offset,
      limit: paginationDto.limit,
      sort: { _id: -1 },
    };

    return new Promise((resolve) => {
      this.catModel.paginate(query, pagination).then((res) => {
        const { docs, totalDocs } = res;
        resolve({
          list: docs.map(this.normalize),
          total: totalDocs,
        });
      });
    });
  }

  async putCat(cat: CatDto) {
    const m = new this.catModel({
      ...cat,
    });
    const doc = await m.save();
    return this.normalize(doc);
  }

  async updateCat(cat: CatDto, id: number) {
    await this.catModel.updateOne(
      { _id: id },
      {
        ...cat,
      },
    );
    return null;
  }
}
