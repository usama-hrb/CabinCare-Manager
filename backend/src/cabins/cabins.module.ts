import { Module } from '@nestjs/common';
import { CabinsController } from './cabins.controller';
import { CabinsService } from './cabins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cabin } from './entity/cabin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cabin])],
  controllers: [CabinsController],
  providers: [CabinsService],
})
export class CabinsModule {}
