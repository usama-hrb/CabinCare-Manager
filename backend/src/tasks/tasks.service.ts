import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceTask } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  async update(id: number, data: UpdateTaskDto) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    Object.assign(task, data);
    return this.tasksRepo.save(task);
  }

  async remove(id: number) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.tasksRepo.remove(task);
    return { deleted: true };
  }
}
