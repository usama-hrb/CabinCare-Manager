import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceTask } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(MaintenanceTask)
    private tasksRepo: Repository<MaintenanceTask>,
  ) {}

  create(data: CreateTaskDto) {
    const task = this.tasksRepo.create(data);
    return this.tasksRepo.save(task);
  }

  findByCabin(cabinId: number) {
    return this.tasksRepo.find({
      where: { cabinId },
    });
  }
}
