import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cabin } from 'src/cabins/entity/cabin.entity';

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
}

@Entity()
export class MaintenanceTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Priority,
  })
  priority: Priority;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToOne(() => Cabin, (cabin) => cabin.tasks)
  cabin: Cabin;

  @Column()
  cabinId: number;
}
