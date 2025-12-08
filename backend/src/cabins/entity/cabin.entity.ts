import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaintenanceTask } from 'src/tasks/entity/task.entity';

@Entity()
export class Cabin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => MaintenanceTask, (task) => task.cabin)
  tasks: MaintenanceTask[];
}
