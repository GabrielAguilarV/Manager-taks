
import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'

import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/dashboard-header'
import { Plus } from 'lucide-react'
import { PermissionsTable } from '@/components/permisos-table'

export default function PermissionsPage() {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader  />
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Permisos de Usuarios</h1>
              <p className="text-muted-foreground mt-1">Administra los permisos de acceso para cada usuario</p>
            </div>
            <Button onClick={() => setShowDialog(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Agregar Permiso
            </Button>
          </div>

          <PermissionsTable />
        </div>
      </main>
    </div>
  )
}
