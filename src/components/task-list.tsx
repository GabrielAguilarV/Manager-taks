"use client"

import { useState } from "react"
import { useTasks } from '@/context/taskContext/TaskContext'
import { useEmployees } from '@/context/employedContext/EmployedContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, Clock, User, Building2, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



export function TaskList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const { tasks, addTask } = useTasks()
  const { employees, incrementActiveTasks, companies } = useEmployees()

  // form state
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [assigneeId, setAssigneeId] = useState('')
  const [priority, setPriority] = useState('media')
  const [status, setStatus] = useState('pendiente')
  const [hours, setHours] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  function handleCreate() {
    if (!title) return
    const newTask = addTask({ title, descripcion: '', empresa: company, responsableId: assigneeId, estado: status, prioridad: priority, tiempoValorado: hours, fechaInicio: startDate, fechaFin: endDate })
    if (assigneeId) incrementActiveTasks(assigneeId)
    // reset
    setTitle('')
    setCompany('')
    setAssigneeId('')
    setPriority('media')
    setStatus('pendiente')
    setHours(0)
    setStartDate('')
    setEndDate('')
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tareas</h1>
          <p className="text-gray-600 mt-1">Gestiona y asigna tareas a tus equipos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Tarea
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
              <DialogDescription>Asigna una nueva tarea a un empleado o encargado</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4 px-0 md:px-0">
              {/* Información General */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Información General</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-company">Entidad/Empresa *</Label>
                    <Select value={company} onValueChange={(v) => setCompany(v)}>
                      <SelectTrigger id="task-company">
                        <SelectValue placeholder="Seleccionar empresa" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-title">Título de la Actividad *</Label>
                    <Input id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Revisar inventario mensual" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-description">Descripción de la Actividad *</Label>
                    <Textarea 
                      id="task-description" 
                      placeholder="Describe los detalles de la tarea..." 
                      rows={4} 
                    />
                  </div>
                </div>
              </div>

              {/* Asignación */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Asignación</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-assigned-by">Asignador</Label>
                    <Select>
                      <SelectTrigger id="task-assigned-by">
                        <SelectValue placeholder="Seleccionar asignador" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="supervisor1">Carlos Méndez</SelectItem>
                        <SelectItem value="supervisor2">Ana Torres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-assignee">Responsable *</Label>
                    <Select value={assigneeId} onValueChange={(v) => setAssigneeId(v)}>
                      <SelectTrigger id="task-assignee">
                        <SelectValue placeholder="Asignar a..." />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Planificación */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Planificación</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-estimated-time">Tiempo Valorado (horas) *</Label>
                    <Input 
                      id="task-estimated-time" 
                      type="number" 
                      placeholder="8" 
                      min="0"
                      step="0.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-start-date">Fecha de Inicio *</Label>
                    <Input id="task-start-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-end-date">Fecha de Fin *</Label>
                    <Input id="task-end-date" type="date" />
                  </div>
                </div>
              </div>

              {/* Estado y Prioridad */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Estado y Prioridad</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-status">Estado *</Label>
                    <Select defaultValue="pendiente">
                      <SelectTrigger id="task-status">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en-proceso">En Proceso</SelectItem>
                        <SelectItem value="completado">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-priority">Prioridad *</Label>
                    <Select>
                      <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 bg-white">
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreate}>
                  Crear Tarea
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="progress">En Progreso</SelectItem>
            <SelectItem value="completed">Completada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const statusColor = task.estado === 'completado' ? 'bg-green-500' : task.estado === 'en-proceso' ? 'bg-blue-500' : 'bg-yellow-500'
          const companyName = task.empresa || ''
          const assigneeName = employees.find((e) => e.id === task.responsableId)?.name || 'Sin asignar'
          const priorityDisplay = task.prioridad ? (task.prioridad === 'alta' ? 'Alta' : task.prioridad === 'media' ? 'Media' : 'Baja') : ''
          const statusDisplay = task.estado || ''
          const start = task.fechaInicio || ''
          const end = task.fechaFin || ''
          const hrs = task.tiempoValorado ?? 0

          return (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-12 ${statusColor} rounded-full`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            <span>{companyName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{assigneeName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        priorityDisplay === 'Alta'
                          ? 'bg-red-100 text-red-700 hover:bg-red-100'
                          : priorityDisplay === 'Media'
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-green-100 text-green-700 hover:bg-green-100'
                      }
                    >
                      {priorityDisplay}
                    </Badge>
                    <Badge variant="outline">{statusDisplay}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {start} - {end}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{hrs} horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
