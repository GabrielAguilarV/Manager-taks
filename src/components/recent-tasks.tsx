import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Revisión de inventario",
    company: "Empresa A - Retail",
    assignee: "María González",
    avatar: "MG",
    status: "En Progreso",
    priority: "Alta",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    hours: 8,
  },
  {
    id: 2,
    title: "Actualización de sistema",
    company: "Empresa B - Tecnología",
    assignee: "Carlos López",
    avatar: "CL",
    status: "Pendiente",
    priority: "Media",
    startDate: "2024-01-18",
    endDate: "2024-01-25",
    hours: 16,
  },
  {
    id: 3,
    title: "Capacitación de personal",
    company: "Empresa C - Servicios",
    assignee: "Ana Martínez",
    avatar: "AM",
    status: "Completada",
    priority: "Baja",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    hours: 12,
  },
]

const statusColors = {
  Pendiente: "bg-yellow-100 text-yellow-800",
  "En Progreso": "bg-blue-100 text-blue-800",
  Completada: "bg-green-100 text-green-800",
}

const priorityColors = {
  Alta: "bg-red-100 text-red-800",
  Media: "bg-orange-100 text-orange-800",
  Baja: "bg-gray-100 text-gray-800",
}

export function RecentTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Tareas Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${task.assignee} avatar`} />
                  <AvatarFallback>{task.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.company}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {task.startDate} - {task.endDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.hours}h
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>{task.priority}</Badge>
                <Badge className={statusColors[task.status as keyof typeof statusColors]}>{task.status}</Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
