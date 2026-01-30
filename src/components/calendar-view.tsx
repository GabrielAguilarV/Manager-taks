"use client"

import { useState } from "react"
import { useTasks } from "@/context/taskContext/TaskContext"
import { useEmployees } from "@/context/employedContext/EmployedContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Building2, AlertCircle } from "lucide-react"

type CalendarEvent = {
  id: string
  title: string
  date: number
  company: string
  color: string
  taskData: any
}

export function CalendarView() {
  const { tasks } = useTasks()
  const { employees } = useEmployees()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // edit form state
  const [editTitle, setEditTitle] = useState('')
  const [editEmpresa, setEditEmpresa] = useState('')
  const [editResponsable, setEditResponsable] = useState('')
  const [editPrioridad, setEditPrioridad] = useState<string | undefined>('media')
  const [editEstado, setEditEstado] = useState<string | undefined>('pendiente')
  const [editFechaInicio, setEditFechaInicio] = useState('')
  const [editFechaFin, setEditFechaFin] = useState('')
  const [editDescripcion, setEditDescripcion] = useState('')
  const [editTiempo, setEditTiempo] = useState<number | undefined>(0)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i)

  const getPriorityColor = (priority?: string) => {
    if (priority === 'alta') return 'bg-red-500'
    if (priority === 'media') return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getEventsForDay = (day: number): CalendarEvent[] => {
    return tasks
      .filter(task => {
        if (!task.fechaInicio) return false
        const taskDate = new Date(task.fechaInicio)
        return taskDate.getDate() === day && taskDate.getMonth() === month && taskDate.getFullYear() === year
      })
      .map(task => ({
        id: task.id,
        title: task.title,
        date: day,
        company: task.empresa || 'Sin empresa',
        color: getPriorityColor(task.prioridad),
        taskData: task
      }))
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const upcomingTasks = tasks
    .filter(task => task.fechaInicio && new Date(task.fechaInicio) >= new Date())
    .sort((a, b) => new Date(a.fechaInicio!).getTime() - new Date(b.fechaInicio!).getTime())
    .slice(0, 5)

  const getAssigneeName = (responsableId?: string) => {
    if (!responsableId) return 'Sin asignar'
    const emp = employees.find(e => e.id === responsableId)
    return emp?.name || 'Desconocido'
  }

  const { updateTask } = useTasks()

  const startEditing = () => {
    if (!selectedEvent) return
    const t = selectedEvent.taskData
    setEditTitle(t.title || '')
    setEditEmpresa(t.empresa || '')
    setEditResponsable(t.responsableId || '')
    setEditPrioridad(t.prioridad || 'media')
    setEditEstado(t.estado || 'pendiente')
    setEditFechaInicio(t.fechaInicio ? t.fechaInicio.split('T')[0] : t.fechaInicio || '')
    setEditFechaFin(t.fechaFin ? t.fechaFin.split('T')[0] : t.fechaFin || '')
    setEditDescripcion(t.descripcion || '')
    setEditTiempo(t.tiempoValorado ?? 0)
    setIsEditing(true)
  }

  const saveEdits = () => {
    if (!selectedEvent) return
    updateTask(selectedEvent.taskData.id, {
      title: editTitle,
      empresa: editEmpresa,
      responsableId: editResponsable,
      prioridad: editPrioridad,
      estado: editEstado,
      fechaInicio: editFechaInicio || undefined,
      fechaFin: editFechaFin || undefined,
      descripcion: editDescripcion,
      tiempoValorado: editTiempo
    })
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendario</h1>
          <p className="text-gray-600 mt-1">Visualiza todas las tareas programadas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="font-semibold">{monthNames[month]} {year}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vista Mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="min-h-24 bg-gray-50 rounded-lg" />
            ))}
            {days.map((day) => {
              const dayEvents = getEventsForDay(day)
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
              return (
                <div
                  key={day}
                  className={`min-h-24 border rounded-lg p-2 hover:bg-gray-50 transition-colors ${
                    isToday ? 'bg-blue-50 border-blue-300' : ''
                  }`}
                >
                  <div className={`font-semibold text-sm mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} text-white text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity`}
                        onClick={() => handleEventClick(event)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Tareas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay tareas programadas</p>
              </div>
            ) : (
              upcomingTasks.map((task) => {
                const taskDate = task.fechaInicio ? new Date(task.fechaInicio) : null
                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleEventClick({
                      id: task.id,
                      title: task.title,
                      date: taskDate?.getDate() || 0,
                      company: task.empresa || 'Sin empresa',
                      color: getPriorityColor(task.prioridad),
                      taskData: task
                    })}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-10 ${getPriorityColor(task.prioridad)} rounded-full`} />
                      <div>
                        <p className="font-semibold text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.empresa || 'Sin empresa'}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {taskDate ? `${taskDate.getDate()} de ${monthNames[taskDate.getMonth()]}` : 'Sin fecha'}
                    </Badge>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>Detalles de la tarea programada</DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 ${selectedEvent.color} rounded-full`} />
                <Badge className={
                  selectedEvent.taskData.prioridad === 'alta' ? 'bg-red-100 text-red-700' :
                  selectedEvent.taskData.prioridad === 'media' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }>
                  Prioridad: {selectedEvent.taskData.prioridad || 'Sin definir'}
                </Badge>
                <Badge variant="outline">
                  {selectedEvent.taskData.estado || 'Pendiente'}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Empresa</p>
                    <p className="text-gray-900">{selectedEvent.company}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Responsable</p>
                    <p className="text-gray-900">{getAssigneeName(selectedEvent.taskData.responsableId)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Fechas</p>
                    <p className="text-gray-900">
                      {selectedEvent.taskData.fechaInicio ? new Date(selectedEvent.taskData.fechaInicio).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Sin fecha de inicio'}
                      {selectedEvent.taskData.fechaFin && (
                        <> - {new Date(selectedEvent.taskData.fechaFin).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Tiempo Estimado</p>
                    <p className="text-gray-900">{selectedEvent.taskData.tiempoValorado || 0} horas</p>
                  </div>
                </div>

                {selectedEvent.taskData.descripcion && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Descripción</p>
                    <p className="text-gray-900">{selectedEvent.taskData.descripcion}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => { setIsDialogOpen(false); setIsEditing(false); }}>
                  Cerrar
                </Button>

                {!isEditing ? (
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={startEditing}>
                    Editar Tarea
                  </Button>
                ) : (
                  <div className="w-full">
                    <div className="grid grid-cols-2 gap-3">
                      <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Título" />
                      <Input value={editEmpresa} onChange={(e) => setEditEmpresa(e.target.value)} placeholder="Empresa" />
                      <select className="border rounded-md px-2 py-1" value={editResponsable} onChange={(e) => setEditResponsable(e.target.value)}>
                        <option value="">Sin asignar</option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                      <select className="border rounded-md px-2 py-1" value={editPrioridad} onChange={(e) => setEditPrioridad(e.target.value)}>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </select>
                      <input className="border rounded-md px-2 py-1" type="date" value={editFechaInicio} onChange={(e) => setEditFechaInicio(e.target.value)} />
                      <input className="border rounded-md px-2 py-1" type="date" value={editFechaFin} onChange={(e) => setEditFechaFin(e.target.value)} />
                      <Textarea value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} placeholder="Descripción" />
                      <Input type="number" value={editTiempo ?? 0} onChange={(e) => setEditTiempo(Number(e.target.value))} placeholder="Tiempo estimado (hrs)" />
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                      <Button onClick={saveEdits} className="bg-green-600 hover:bg-green-700">Guardar</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
