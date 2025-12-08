import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceTask } from './entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceTask])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
