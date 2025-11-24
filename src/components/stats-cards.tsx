import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckSquare, Users, Clock } from "lucide-react"

const stats = [
  {
    title: "Empresas Activas",
    value: "3",
    description: "Diferentes giros",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Tareas Pendientes",
    value: "12",
    description: "+2 desde ayer",
    icon: CheckSquare,
    color: "text-orange-600",
  },
  {
    title: "Empleados Totales",
    value: "24",
    description: "En todas las empresas",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Horas Asignadas",
    value: "156",
    description: "Esta semana",
    icon: Clock,
    color: "text-purple-600",
  },
]

export function StatsCards() {
  return (
    <>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
