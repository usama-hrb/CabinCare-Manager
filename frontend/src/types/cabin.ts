export type Task = {
  id: number;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETE";
  cabinId: number;
};

export type Cabin = {
  id: number;
  name: string;
  location: string;
  description: string | null;
  tasks: Task[];
};

