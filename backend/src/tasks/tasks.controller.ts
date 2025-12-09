import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  // PATCH: http://localhost:3000/tasks/:id
  // body can be { description?, priority?, status?, cabinId? }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(+id, body);
  }

  // DELETE: http://localhost:3000/tasks/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
