import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // POST: http://localhost/tasks
  // body { description: "", priority: "", status: "", cabinId: Number}
  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  // GET: http://localhost/tasks/cabin/:id
  @Get('cabin/:id')
  findByCabin(@Param('id') id: number) {
    return this.tasksService.findByCabin(+id);
  }
}
