import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cabin } from './entity/cabin.entity';
import { Repository } from 'typeorm';
import { CreateCabinDto } from './dto/create-cabin.dto';

@Injectable()
export class CabinsService {
  constructor(
    @InjectRepository(Cabin)
    private readonly cabinsRepo: Repository<Cabin>,
  ) {}

  create(CreateCabinDto: CreateCabinDto) {
    const newCabin = this.cabinsRepo.create(CreateCabinDto);
    return this.cabinsRepo.save(newCabin);
  }

  findAll() {
    return this.cabinsRepo.find({
      relations: ['tasks'],
    });
  }
  findOne(id: number) {
    return this.cabinsRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async remove(id: number) {
    const cabin = await this.cabinsRepo.findOne({ where: { id } });
    if (!cabin) {
      throw new NotFoundException(`Cabin with id ${id} not found`);
    }

    await this.cabinsRepo.remove(cabin);
    return { deleted: true };
  }
}
