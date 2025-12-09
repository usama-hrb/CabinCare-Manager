export type Priority = "HIGH" | "MEDIUM" | "LOW";
export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETE";

export type Task = {
  id: number;
  description: string;
  priority: Priority;
  status: Status;
  cabinId: number;
};

export type Cabin = {
  id: number;
  name: string;
  location: string;
  description: string | null;
  tasks: Task[];
};

export type NewTaskInput = {
  description: string;
  priority: Priority;
  status: Status;
  cabinId: number;
};

export type UpdateTaskInput = {
  id: number;
  description?: string;
  priority?: Priority;
  status?: Status;
};


