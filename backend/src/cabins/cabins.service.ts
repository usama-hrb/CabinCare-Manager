import { Injectable } from '@nestjs/common';
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
}
