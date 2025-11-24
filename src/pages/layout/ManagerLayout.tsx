import { DashboardHeader } from '@/components/dashboard-header'
import { Sidebar } from '@/components/sidebar'
import { Outlet } from 'react-router'
import { EmployeeProvider } from '@/context/employedContext/EmployedContext'
import { TaskProvider } from '@/context/taskContext/TaskContext'

export const ManagerLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col">

                <DashboardHeader />

                <main className="flex-1 overflow-y-auto p-6 mt-[72px]">
                    <EmployeeProvider>
                        <TaskProvider>
                            <Outlet />
                        </TaskProvider>
                    </EmployeeProvider>
                </main>
            </div>
        </div>
    )
}
