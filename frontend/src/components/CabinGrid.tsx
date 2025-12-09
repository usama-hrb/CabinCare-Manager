import type { Cabin } from "@/types/cabin";
import { ChevronRight } from "lucide-react";

type CabinGridProps = {
  cabins: Cabin[];
  onSelectCabin: (id: number) => void;
};

export default function CabinGrid({ cabins, onSelectCabin }: CabinGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {cabins.map((cabin) => {
        const highPriority = cabin.tasks.filter(
          (task) => task.status === "PENDING" && task.priority === "HIGH"
        ).length;

        const mediumPriority = cabin.tasks.filter(
          (task) => task.status === "PENDING" && task.priority === "MEDIUM"
        ).length;

        return (
          <div
            key={cabin.id}
            onClick={() => onSelectCabin(cabin.id)}
            className="bg-card border rounded-2xl p-6 cursor-pointer hover:shadow-md hover:border-primary hover:scale-[1.01] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{cabin.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {cabin.location}
                </p>
              </div>
              <ChevronRight />
            </div>

            {cabin.description && (
              <p className="text-sm text-foreground/70 mb-3 line-clamp-2 ">
                {cabin.description}
              </p>
            )}

            <div className="flex gap-3">
              {highPriority > 0 && (
                <div className="px-3 py-1 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                    {highPriority} High
                  </span>
                </div>
              )}

              {mediumPriority > 0 && (
                <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {mediumPriority} Medium
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
