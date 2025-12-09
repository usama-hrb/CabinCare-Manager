import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import { api } from "../lib/api";
import CabinGrid from "./CabinGrid";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import type { Cabin, Task } from "src/types/cabin";
import NewCabinModal from "./NewCabinModal";

type DashboardContentProps = {
  onNewCabin: () => void;
  onSelectCabin: (id: number) => void;
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
        ...created, tasks: created.tasks ?? [],
      };
      setCabins((prev) => [...prev,safeCabinWithTasks]);
      onCloseNewCabinModal();
    } catch (err) {
      console.error("Failed to create cabin: ", err);
    }
  };

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
    </main>
  );
}
