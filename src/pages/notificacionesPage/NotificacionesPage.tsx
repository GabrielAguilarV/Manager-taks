import { useState } from "react"
import { useTasks } from "@/context/taskContext/TaskContext"
import { useEmployees } from "@/context/employedContext/EmployedContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Bell, 
  BellRing,
  Search, 
  Check,
  Trash2,
  AlertCircle,
  Calendar,
  Clock,
  User,
  Building2,
  CheckCircle2,
  Archive,
  Filter
} from "lucide-react"

type Notification = {
  id: string
  type: 'task_assigned' | 'task_completed' | 'task_overdue' | 'task_reminder' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: 'high' | 'medium' | 'low'
  relatedTask?: string
  relatedEmployee?: string
}

const generateNotifications = (tasks: any[], employees: any[]): Notification[] => {
  const notifications: Notification[] = []
  const now = new Date()

  // Notificaciones de tareas asignadas
  tasks.slice(0, 3).forEach((task, idx) => {
    if (task.responsableId) {
      const emp = employees.find(e => e.id === task.responsableId)
      notifications.push({
        id: `notif-assign-${idx}`,
        type: 'task_assigned',
        title: 'Nueva tarea asignada',
        message: `Se te ha asignado la tarea "${task.title}" en ${task.empresa || 'Sin empresa'}`,
        timestamp: new Date(now.getTime() - Math.random() * 3600000 * 24),
        read: Math.random() > 0.5,
        priority: task.prioridad === 'alta' ? 'high' : task.prioridad === 'media' ? 'medium' : 'low',
        relatedTask: task.id,
        relatedEmployee: task.responsableId
      })
    }
  })

  // Notificaciones de tareas próximas a vencer
  tasks.filter(t => t.fechaFin && t.estado !== 'completado').slice(0, 2).forEach((task, idx) => {
    notifications.push({
      id: `notif-due-${idx}`,
      type: 'task_reminder',
      title: 'Tarea próxima a vencer',
      message: `La tarea "${task.title}" vence el ${new Date(task.fechaFin!).toLocaleDateString('es-MX')}`,
      timestamp: new Date(now.getTime() - Math.random() * 3600000 * 12),
      read: Math.random() > 0.7,
      priority: 'high',
      relatedTask: task.id
    })
  })

  // Notificaciones de tareas completadas
  tasks.filter(t => t.estado === 'completado').slice(0, 2).forEach((task, idx) => {
    const emp = employees.find(e => e.id === task.responsableId)
    notifications.push({
      id: `notif-complete-${idx}`,
      type: 'task_completed',
      title: 'Tarea completada',
      message: `${emp?.name || 'Un empleado'} ha completado la tarea "${task.title}"`,
      timestamp: new Date(now.getTime() - Math.random() * 3600000 * 48),
      read: true,
      priority: 'low',
      relatedTask: task.id,
      relatedEmployee: task.responsableId
    })
  })

  // Notificaciones del sistema
  notifications.push(
    {
      id: 'notif-sys-1',
      type: 'system',
      title: 'Bienvenido al sistema',
      message: 'Tu cuenta ha sido activada correctamente. Ya puedes gestionar tareas y equipos.',
      timestamp: new Date(now.getTime() - 3600000 * 72),
      read: true,
      priority: 'low'
    },
    {
      id: 'notif-sys-2',
      type: 'system',
      title: 'Actualización disponible',
      message: 'Hay nuevas funcionalidades disponibles en el sistema de gestión.',
      timestamp: new Date(now.getTime() - 3600000 * 24),
      read: false,
      priority: 'medium'
    }
  )

  return notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export const NotificacionesPage = () => {
  const { tasks } = useTasks()
  const { employees } = useEmployees()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterRead, setFilterRead] = useState("all")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const [notifications, setNotifications] = useState<Notification[]>(() => 
    generateNotifications(tasks, employees)
  )

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'task_assigned': return <User className="h-5 w-5 text-blue-600" />
      case 'task_completed': return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'task_overdue': return <AlertCircle className="h-5 w-5 text-red-600" />
      case 'task_reminder': return <Clock className="h-5 w-5 text-yellow-600" />
      case 'system': return <Bell className="h-5 w-5 text-purple-600" />
      default: return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-700 border-red-300'
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-300'
    return 'bg-green-100 text-green-700 border-green-300'
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'task_assigned': 'Tarea Asignada',
      'task_completed': 'Tarea Completada',
      'task_overdue': 'Tarea Vencida',
      'task_reminder': 'Recordatorio',
      'system': 'Sistema'
    }
    return labels[type] || type
  }

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || notif.type === filterType
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'unread' && !notif.read) ||
                       (filterRead === 'read' && notif.read)
    return matchesSearch && matchesType && matchesRead
  })

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    high: notifications.filter(n => n.priority === 'high' && !n.read).length
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleDeleteSelected = () => {
    setNotifications(notifications.filter(n => !selectedIds.includes(n.id)))
    setSelectedIds([])
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id))
    }
  }

  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return 'hace un momento'
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} minutos`
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} horas`
    if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)} días`
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
          <p className="text-gray-600 mt-1">Mantente al día con todas las actualizaciones</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleMarkAllAsRead}
            disabled={stats.unread === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
          {selectedIds.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={handleDeleteSelected}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bell className="h-8 w-8 text-blue-600" />
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sin Leer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BellRing className="h-8 w-8 text-orange-600" />
              <p className="text-3xl font-bold">{stats.unread}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Prioridad Alta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <p className="text-3xl font-bold">{stats.high}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar notificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="task_assigned">Tareas Asignadas</SelectItem>
                <SelectItem value="task_completed">Completadas</SelectItem>
                <SelectItem value="task_reminder">Recordatorios</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRead} onValueChange={setFilterRead}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="unread">Sin leer</SelectItem>
                <SelectItem value="read">Leídas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredNotifications.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                checked={selectedIds.length === filteredNotifications.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">Seleccionar todas</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las notificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No hay notificaciones para mostrar</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${
                    notif.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={selectedIds.includes(notif.id)}
                    onCheckedChange={() => handleToggleSelect(notif.id)}
                    className="mt-1"
                  />

                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notif.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${notif.read ? 'text-gray-900' : 'text-blue-900'}`}>
                            {notif.title}
                          </h3>
                          {!notif.read && (
                            <Badge className="bg-blue-600 text-white">Nuevo</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{notif.message}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {getRelativeTime(notif.timestamp)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(notif.type)}
                          </Badge>
                          <Badge className={`${getPriorityColor(notif.priority)} text-xs`}>
                            {notif.priority === 'high' ? 'Alta' : notif.priority === 'medium' ? 'Media' : 'Baja'}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-1">
                        {!notif.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notif.id)}
                            title="Marcar como leída"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(notif.id)}
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificacionesPage
