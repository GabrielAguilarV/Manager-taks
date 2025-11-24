import { useState } from "react"
import { useTasks } from "@/context/taskContext/TaskContext"
import { useEmployees } from "@/context/employedContext/EmployedContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Building2, 
  Clock, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download
} from "lucide-react"

type HistoryEntry = {
  id: string
  taskId: string
  taskTitle: string
  empresa: string
  responsable: string
  estado: string
  prioridad: string
  fechaInicio: string
  fechaFin: string
  tiempoValorado: number
  completedDate?: string
  notes?: string
}

export const HistorialPage = () => {
  const { tasks } = useTasks()
  const { employees } = useEmployees()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterCompany, setFilterCompany] = useState("all")
  const [selectedTask, setSelectedTask] = useState<HistoryEntry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Obtener empresas únicas
  const companies = Array.from(new Set(tasks.map(t => t.empresa).filter(Boolean))) as string[]

  // Crear historial desde tareas
  const historyEntries: HistoryEntry[] = tasks.map(task => ({
    id: task.id,
    taskId: task.id,
    taskTitle: task.title,
    empresa: task.empresa || 'Sin empresa',
    responsable: employees.find(e => e.id === task.responsableId)?.name || 'Sin asignar',
    estado: task.estado || 'pendiente',
    prioridad: task.prioridad || 'media',
    fechaInicio: task.fechaInicio || '',
    fechaFin: task.fechaFin || '',
    tiempoValorado: task.tiempoValorado || 0,
    completedDate: task.estado === 'completado' ? task.fechaFin : undefined,
    notes: task.descripcion
  }))

  // Filtrar historial
  const filteredHistory = historyEntries.filter(entry => {
    const matchesSearch = entry.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.responsable.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || entry.estado === filterStatus
    const matchesPriority = filterPriority === 'all' || entry.prioridad === filterPriority
    const matchesCompany = filterCompany === 'all' || entry.empresa === filterCompany
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCompany
  })

  // Estadísticas
  const stats = {
    total: historyEntries.length,
    completadas: historyEntries.filter(e => e.estado === 'completado').length,
    enProceso: historyEntries.filter(e => e.estado === 'en-proceso').length,
    pendientes: historyEntries.filter(e => e.estado === 'pendiente').length,
    horasTotales: historyEntries.reduce((sum, e) => sum + e.tiempoValorado, 0)
  }

  const getStatusIcon = (status: string) => {
    if (status === 'completado') return <CheckCircle2 className="h-4 w-4 text-green-600" />
    if (status === 'en-proceso') return <AlertCircle className="h-4 w-4 text-blue-600" />
    return <XCircle className="h-4 w-4 text-gray-400" />
  }

  const getStatusColor = (status: string) => {
    if (status === 'completado') return 'bg-green-100 text-green-700'
    if (status === 'en-proceso') return 'bg-blue-100 text-blue-700'
    return 'bg-gray-100 text-gray-700'
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'alta') return 'bg-red-100 text-red-700'
    if (priority === 'media') return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  const handleViewDetails = (entry: HistoryEntry) => {
    setSelectedTask(entry)
    setIsDialogOpen(true)
  }

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Tarea', 'Empresa', 'Responsable', 'Estado', 'Prioridad', 'Fecha Inicio', 'Fecha Fin', 'Horas'],
      ...filteredHistory.map(e => [
        e.id,
        e.taskTitle,
        e.empresa,
        e.responsable,
        e.estado,
        e.prioridad,
        e.fechaInicio,
        e.fechaFin,
        e.tiempoValorado.toString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `historial-tareas-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historial de Tareas</h1>
          <p className="text-gray-600 mt-1">Registro completo de todas las actividades</p>
        </div>
        <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <History className="h-8 w-8 text-blue-600" />
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <p className="text-3xl font-bold">{stats.completadas}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En Proceso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-blue-600" />
              <p className="text-3xl font-bold">{stats.enProceso}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-8 w-8 text-gray-600" />
              <p className="text-3xl font-bold">{stats.pendientes}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Horas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <p className="text-3xl font-bold">{stats.horasTotales}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar tareas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="en-proceso">En Proceso</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las prioridades</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCompany} onValueChange={setFilterCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las empresas</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* History Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Actividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No se encontraron tareas con los filtros aplicados</p>
              </div>
            ) : (
              filteredHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleViewDetails(entry)}
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    {getStatusIcon(entry.estado)}
                    <div className="w-0.5 h-full bg-gray-200 mt-2" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{entry.taskTitle}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            <span>{entry.empresa}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{entry.responsable}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {entry.fechaInicio ? new Date(entry.fechaInicio).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : 'Sin fecha'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{entry.tiempoValorado}h</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(entry.prioridad)}>
                          {entry.prioridad}
                        </Badge>
                        <Badge className={getStatusColor(entry.estado)}>
                          {entry.estado}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTask?.taskTitle}</DialogTitle>
            <DialogDescription>Detalles completos de la tarea</DialogDescription>
          </DialogHeader>

          {selectedTask && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                {getStatusIcon(selectedTask.estado)}
                <Badge className={getStatusColor(selectedTask.estado)}>
                  {selectedTask.estado}
                </Badge>
                <Badge className={getPriorityColor(selectedTask.prioridad)}>
                  Prioridad: {selectedTask.prioridad}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Empresa</p>
                    <p className="text-gray-900">{selectedTask.empresa}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Responsable</p>
                    <p className="text-gray-900">{selectedTask.responsable}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Período</p>
                    <p className="text-gray-900">
                      {selectedTask.fechaInicio ? new Date(selectedTask.fechaInicio).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Sin fecha de inicio'}
                      {selectedTask.fechaFin && (
                        <> - {new Date(selectedTask.fechaFin).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Tiempo Estimado</p>
                    <p className="text-gray-900">{selectedTask.tiempoValorado} horas</p>
                  </div>
                </div>

                {selectedTask.notes && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Descripción</p>
                    <p className="text-gray-900">{selectedTask.notes}</p>
                  </div>
                )}

                {selectedTask.completedDate && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="font-semibold">
                        Completada el {new Date(selectedTask.completedDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HistorialPage
