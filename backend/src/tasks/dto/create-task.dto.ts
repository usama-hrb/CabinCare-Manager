import { Priority, Status } from '../entity/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  priority: Priority;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  cabinId: number;
}
