
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { RecentTasks } from "@/components/recent-tasks"
import { CompanyOverview } from "@/components/company-overview"
import { TaskChart } from "@/components/task-chart"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCards />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TaskChart />
            </div>
            <CompanyOverview />
          </div>
          <RecentTasks />
        </main>
      </div>
    </div>
  )
}
