import { useState } from "react";
import type {
  Cabin,
  Priority,
  Status,
  NewTaskInput,
  UpdateTaskInput,
} from "@/types/cabin";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { toast } from "sonner";

function getPriorityColor(priority: Priority) {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400";
    case "MEDIUM":
      return "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400";
    case "LOW":
      return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400";
    default:
      return "";
  }
}

function getStatusColor(status: Status) {
  switch (status) {
    case "PENDING":
      return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    case "IN_PROGRESS":
      return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400";
    case "COMPLETE":
      return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400";
    default:
      return "";
  }
}

function formatStatus(status: Status) {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "IN_PROGRESS":
      return "In Progress";
    case "COMPLETE":
      return "Complete";
  }
}

type CabinDetailsPanelProps = {
  cabin: Cabin | null;
  onClose: () => void;
  onAddTask: (task: NewTaskInput) => void;
  onUpdateTask: (task: UpdateTaskInput) => void;
  onDeleteTask: (id: number) => void;
  onDeleteCabin: (id: number) => void;
};

export default function CabinDetailsPanel({
  cabin,
  onClose,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onDeleteCabin,
}: CabinDetailsPanelProps) {
  const [taskForm, setTaskForm] = useState<{
    description: string;
    priority: Priority;
    status: Status;
  }>({
    description: "",
    priority: "MEDIUM",
    status: "PENDING",
  });

  if (!cabin) return null;

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskForm.description.trim()) {
      onAddTask({
        ...taskForm,
        cabinId: cabin.id,
      });
      setTaskForm({ description: "", priority: "MEDIUM", status: "PENDING" });
    }
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border pointer-events-auto shadow-lg flex flex-col overflow-hidden animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{cabin.name}</h2>
            <p className="text-muted-foreground mt-1">{cabin.location}</p>
          </div>
          <Button
            className="bg-transparent p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={onClose}
          >
            <X className="w-6! h-6! text-foreground" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 space-y-8">
          {/* Description */}
          <div>
            <p className="text-foreground/70">{cabin.description}</p>
          </div>

          {/* Maintenance Tasks */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Maintenance Tasks
            </h3>
            {cabin.tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No tasks yet. Add one below!
              </p>
            ) : (
              <div className="space-y-3">
                {cabin.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-muted/50 rounded-lg p-4 flex items-start gap-4"
                  >
                    <div className="flex-1">
                      <p className="text-foreground font-medium">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3 items-center">
                        {/* Priority pill */}
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>

                        {/* Status pill */}
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {formatStatus(task.status)}
                        </span>

                        {/* Status selector */}
                        <div className="ml-auto flex items-center gap-2">
                          <label className="text-xs text-muted-foreground">
                            Status
                          </label>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              onUpdateTask({
                                id: task.id,
                                status: e.target.value as Status, // "PENDING" | "IN_PROGRESS" | "COMPLETE"
                              })
                            }
                            className="text-xs px-2 py-1 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETE">Complete</option>
                          </select>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                type="button"
                                className="text-xs px-2 py-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10"
                              >
                                Delete
                              </button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Task?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. The task will be
                                  permanently removed.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    onDeleteTask(task.id);
                                    toast.success("Task deleted", {
                                      description:
                                        "The task was removed successfully.",
                                    });
                                  }}
                                  className="bg-destructive text-white hover:bg-destructive/90"
                                >
                                  Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Task Form */}
          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Add New Task
            </h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Task Description
                </label>
                <textarea
                  placeholder="Describe the maintenance task..."
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        priority: e.target.value as Priority,
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    value={taskForm.status}
                    onChange={(e) =>
                      setTaskForm({
                        ...taskForm,
                        status: e.target.value as Status,
                      })
                    }
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETE">Complete</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Add Task
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    Delete cabin
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Cabin?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The cabin will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDeleteCabin(cabin.id);
                        toast.success("Cabin deleted", {
                          description: "The cabin was removed successfully.",
                        });
                      }}
                      className="bg-destructive text-white hover:bg-destructive/90"
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
