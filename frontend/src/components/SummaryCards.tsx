import { Home } from "lucide-react";

type SummaryCardsProps = {
  totalCabins: number
  totalHigh: number
  totalMedium: number
}

export default function SummaryCards({ totalCabins, totalHigh, totalMedium } : SummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Total Cabins
            </p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {totalCabins}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <Home color="blue" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              High Priority
            </p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {totalHigh}
            </p>
          </div>
          <div className="px-3 py-1 bg-red-100 dark:bg-red-900/20 rounded-full">
            <span className="text-xs font-bold text-red-600 dark:text-red-400">
              URGENT
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">
              Medium Priority
            </p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {totalMedium}
            </p>
          </div>
          <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/20 rounded-full">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
              MEDIUM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
