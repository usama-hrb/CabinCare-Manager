import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import { api } from "../lib/api";
import CabinGrid from "./CabinGrid";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import type {
  Cabin,
  Task,
  NewTaskInput,
  UpdateTaskInput,
} from "src/types/cabin";
import NewCabinModal from "./NewCabinModal";
import CabinDetailsPanel from "./CabinDetailsPanel";

type DashboardContentProps = {
  onNewCabin: () => void;
  onSelectCabin: (id: number | null) => void;
  selectedCabin: number | null;
  showNewCabinModal: boolean;
  onCloseNewCabinModal: () => void;
};

type newCabinInput = {
  name: string;
  location: string;
  description?: string;
};

export default function DashboardContent({
  onNewCabin,
  onSelectCabin,
  selectedCabin,
  showNewCabinModal,
  onCloseNewCabinModal,
}: DashboardContentProps) {
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCabins() {
      try {
        const res = await api.get<Cabin[]>("/cabins");
        setCabins(res.data);
      } catch (err) {
        console.error("Failed to load cabins: ", err);
      } finally {
        setLoading(false);
      }
    }
    loadCabins();
  }, []);

  const totalCabins = cabins.length;

  function countTasks(cabins: Cabin[], priority: string) {
    return cabins.reduce((sum, cabin) => {
      const tasks = cabin.tasks ?? [];
      const count = tasks.filter(
        (task) => task.status === "PENDING" && task.priority === priority
      ).length;
      return sum + count;
    }, 0);
  }
  const totalHigh = countTasks(cabins, "HIGH");
  const totalMedium = countTasks(cabins, "MEDIUM");

  if (loading) {
    return (
      <main className="flex-1 overflow-auto">
        <div className="p-8 text-sm text-slate-500">Loading dashboard...</div>
      </main>
    );
  }

  const handleAddCabin = async (newCabin: newCabinInput) => {
    try {
      const res = await api.post<Cabin>("/cabins", newCabin);

      const created = res.data;

      const safeCabinWithTasks: Cabin = {
        ...created,
        tasks: created.tasks ?? [],
      };
      setCabins((prev) => [...prev, safeCabinWithTasks]);
      onCloseNewCabinModal();
    } catch (err) {
      console.error("Failed to create cabin: ", err);
    }
  };

  const handleAddTask = async (task: NewTaskInput) => {
    try {
      const res = await api.post<Task>("/tasks", task);
      const created = res.data;

      setCabins((prev) =>
        prev.map((c) =>
          c.id === created.cabinId ? { ...c, tasks: [...c.tasks, created] } : c
        )
      );
    } catch (err) {
      console.error("Failed to add task: ", err);
    }
  };

  const handleUpdateTask = async (update: UpdateTaskInput) => {
    try {
      const { id, ...data } = update;

      const res = await api.patch<Task>(`/tasks/${id}`, data);
      const updated = res.data;

      setCabins((prev) =>
        prev.map((cabin) =>
          cabin.id === updated.cabinId
            ? {
                ...cabin,
                tasks: cabin.tasks.map((t) =>
                  t.id === updated.id ? updated : t
                ),
              }
            : cabin
        )
      );
    } catch (err) {
      console.error("Failed to update task: ", err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);

      setCabins((prev) =>
        prev.map((cabin) => ({
          ...cabin,
          tasks: cabin.tasks.filter((t) => t.id !== id),
        }))
      );
    } catch (err) {
      console.error("Failed to delete task: ", err);
    }
  };

  const handleDeleteCabin = async (id: number) => {
    try {
      await api.delete(`/cabins/${id}`);
      setCabins((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete cabin: ", err);
    }
  };

  const selectedCabinObj = cabins.find((c) => c.id === selectedCabin) ?? null;

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-8">
        <SummaryCards
          totalCabins={totalCabins}
          totalHigh={totalHigh}
          totalMedium={totalMedium}
        />

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Your Cabins</h2>
          <Button onClick={onNewCabin}>
            <Plus />
            New Cabin
          </Button>
        </div>
        <CabinGrid cabins={cabins} onSelectCabin={onSelectCabin} />
      </div>
      <NewCabinModal
        open={showNewCabinModal}
        onClose={onCloseNewCabinModal}
        onSubmit={handleAddCabin}
      />
      <CabinDetailsPanel
        cabin={selectedCabinObj}
        onClose={() => onSelectCabin(null)}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onDeleteCabin={handleDeleteCabin}
      />
    </main>
  );
}
