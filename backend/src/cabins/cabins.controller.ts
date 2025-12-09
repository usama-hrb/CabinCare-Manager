import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { CabinsService } from './cabins.service';

@Controller('cabins')
export class CabinsController {
  constructor(private readonly cabinsService: CabinsService) {}

  // POST http://localhost:3000/cabins
  // body {name: "", location: "", description?: ""}
  @Post()
  create(@Body() body: CreateCabinDto) {
    return this.cabinsService.create(body);
  }

  //GET http://localhost:3000/cabins
  @Get()
  findAll() {
    return this.cabinsService.findAll();
  }

  //GET http://localhost:3000/cabins/:id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cabinsService.findOne(+id);
  }

  // DELETE: http://localhost:3000/cabins/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cabinsService.remove(+id);
  }
}
