import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TariffsEntity } from 'src/database/entity/Tariffs.entity';
import { Repository } from 'typeorm';
import { CreateTariffsDto } from './dto/create.tariffs.dto';
import { FindUserParams } from 'src/shared/types/find.types';
import { UpdateTariffDto } from './dto/update.tariff.dto';

@Injectable()
export class TariffsService {
  constructor(
    @InjectRepository(TariffsEntity)
    private tariffsRepo: Repository<TariffsEntity>,
  ) {}
  find(params: FindUserParams<TariffsEntity>) {
    let { where, select, relations } = params;
    return this.tariffsRepo.find({ where, select, relations });
  }
  findOne(params: FindUserParams<TariffsEntity>) {
    let { where, select, relations } = params;
    return this.tariffsRepo.findOne({ where, select, relations });
  }
  async tariffs() {
    return await this.tariffsRepo.find();
  }
  async getTariffsByCountry(country: string) {
    const tariffs = await this.find({ where: { countyName: country } });
    if (!tariffs) throw new NotFoundException('Not found tariff for country');
    return tariffs;
  }
  async createTariff(body: CreateTariffsDto) {
    const data = this.tariffsRepo.create(body);
    console.log(data);

    await data.save();
    return data;
  }
  async updateTariff(id: number, body: UpdateTariffDto) {
    const data = await this.findOne({ where: { id } });
    for (let key in body) {
      data[key] = body[key];
    }
    await this.tariffsRepo.save(data);
    return { status: true, message: 'Tariff updated', data };
  }
}
