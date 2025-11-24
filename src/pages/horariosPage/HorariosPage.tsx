import { useState } from "react"
import { useEmployees } from "@/context/employedContext/EmployedContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Clock, Plus, Calendar, Users, Trash2 } from "lucide-react"

type Shift = {
  id: string
  employeeId: string
  day: number // 0-6 (Sunday-Saturday)
  startTime: string // "09:00"
  endTime: string // "17:00"
  type: 'morning' | 'afternoon' | 'night' | 'full'
  notes?: string
}

const SHIFT_TYPES = {
  morning: { label: 'Matutino', color: 'bg-yellow-100 text-yellow-700', time: '06:00 - 14:00' },
  afternoon: { label: 'Vespertino', color: 'bg-orange-100 text-orange-700', time: '14:00 - 22:00' },
  night: { label: 'Nocturno', color: 'bg-purple-100 text-purple-700', time: '22:00 - 06:00' },
  full: { label: 'Completo', color: 'bg-blue-100 text-blue-700', time: '09:00 - 18:00' }
}

export const HorariosPage = () => {
  const { employees } = useEmployees()
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date()
    const day = today.getDay()
    const diff = today.getDate() - day
    return new Date(today.setDate(diff))
  })
  const [shifts, setShifts] = useState<Shift[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [shiftType, setShiftType] = useState<keyof typeof SHIFT_TYPES>('morning')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [notes, setNotes] = useState('')

  const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  
  const getWeekDates = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentWeekStart)
      date.setDate(currentWeekStart.getDate() + i)
      return date
    })
  }

  const weekDates = getWeekDates()

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(currentWeekStart.getDate() - 7)
    setCurrentWeekStart(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(currentWeekStart.getDate() + 7)
    setCurrentWeekStart(newDate)
  }

  const handleAddShift = () => {
    if (!selectedEmployee) return
    const newShift: Shift = {
      id: Date.now().toString(),
      employeeId: selectedEmployee,
      day: selectedDay,
      startTime,
      endTime,
      type: shiftType,
      notes
    }
    setShifts([...shifts, newShift])
    setSelectedEmployee('')
    setNotes('')
    setIsDialogOpen(false)
  }

  const getShiftsForDay = (day: number) => {
    return shifts.filter(s => s.day === day)
  }

  const deleteShift = (shiftId: string) => {
    setShifts(shifts.filter(s => s.id !== shiftId))
  }

  const getEmployeeName = (empId: string) => {
    return employees.find(e => e.id === empId)?.name || 'Desconocido'
  }

  const getTotalHoursForEmployee = (empId: string) => {
    return shifts
      .filter(s => s.employeeId === empId)
      .reduce((acc, shift) => {
        const [startH, startM] = shift.startTime.split(':').map(Number)
        const [endH, endM] = shift.endTime.split(':').map(Number)
        const hours = (endH * 60 + endM - (startH * 60 + startM)) / 60
        return acc + hours
      }, 0)
  }

  const openDialogForDay = (day: number) => {
    setSelectedDay(day)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Horarios y Turnos</h1>
          <p className="text-gray-600 mt-1">Gestiona los horarios semanales de tu equipo</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="font-semibold">
              {weekDates[0].toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })} - {weekDates[6].toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              <p className="text-3xl font-bold">{employees.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Turnos Asignados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-green-600" />
              <p className="text-3xl font-bold">{shifts.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Horas Semanales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <p className="text-3xl font-bold">
                {shifts.reduce((acc, shift) => {
                  const [startH, startM] = shift.startTime.split(':').map(Number)
                  const [endH, endM] = shift.endTime.split(':').map(Number)
                  return acc + (endH * 60 + endM - (startH * 60 + startM)) / 60
                }, 0).toFixed(1)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Turnos Matutinos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <p className="text-3xl font-bold">{shifts.filter(s => s.type === 'morning').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Vista Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-2 min-w-[800px]">
              {/* Header Row */}
              <div className="font-semibold text-gray-700 p-3 bg-gray-50 rounded-lg">
                Empleado
              </div>
              {weekDays.map((day, idx) => (
                <div key={day} className="text-center font-semibold text-gray-700 p-3 bg-gray-50 rounded-lg">
                  <div>{day}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {weekDates[idx].getDate()}
                  </div>
                </div>
              ))}

              {/* Employee Rows */}
              {employees.slice(0, 5).map((employee) => (
                <>
                  <div key={employee.id} className="p-3 border rounded-lg bg-white flex items-center gap-2">
                    <div>
                      <p className="font-semibold text-sm">{employee.name}</p>
                      <p className="text-xs text-gray-500">{employee.role}</p>
                      <Badge className="mt-1 text-xs">
                        {getTotalHoursForEmployee(employee.id).toFixed(1)}h/sem
                      </Badge>
                    </div>
                  </div>
                  {weekDays.map((_, dayIdx) => {
                    const dayShifts = getShiftsForDay(dayIdx).filter(s => s.employeeId === employee.id)
                    return (
                      <div
                        key={`${employee.id}-${dayIdx}`}
                        className="min-h-20 border rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedEmployee(employee.id)
                          openDialogForDay(dayIdx)
                        }}
                      >
                        <div className="space-y-1">
                          {dayShifts.map((shift) => (
                            <div
                              key={shift.id}
                              className="group relative"
                            >
                              <Badge className={`${SHIFT_TYPES[shift.type].color} text-xs w-full justify-between`}>
                                <span>{shift.startTime} - {shift.endTime}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteShift(shift.id)
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shift Types Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Turno</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(SHIFT_TYPES).map(([key, { label, color, time }]) => (
              <div key={key} className="flex items-center gap-3 p-3 border rounded-lg">
                <Badge className={color}>{label}</Badge>
                <span className="text-sm text-gray-600">{time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Shift Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Asignar Turno</DialogTitle>
            <DialogDescription>
              {weekDays[selectedDay]} - {weekDates[selectedDay]?.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="shift-employee">Empleado *</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger id="shift-employee">
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name} - {emp.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shift-type">Tipo de Turno *</Label>
              <Select value={shiftType} onValueChange={(v) => setShiftType(v as keyof typeof SHIFT_TYPES)}>
                <SelectTrigger id="shift-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SHIFT_TYPES).map(([key, { label, time }]) => (
                    <SelectItem key={key} value={key}>
                      {label} ({time})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shift-start">Hora Inicio</Label>
                <Input
                  id="shift-start"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift-end">Hora Fin</Label>
                <Input
                  id="shift-end"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shift-notes">Notas (opcional)</Label>
              <Input
                id="shift-notes"
                placeholder="Ej: Turno de cobertura"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddShift}>
              <Plus className="h-4 w-4 mr-2" />
              Asignar Turno
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
