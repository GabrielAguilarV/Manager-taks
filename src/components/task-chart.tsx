"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Lun", pendientes: 4, progreso: 2, completadas: 6 },
  { name: "Mar", pendientes: 3, progreso: 4, completadas: 5 },
  { name: "Mié", pendientes: 2, progreso: 3, completadas: 8 },
  { name: "Jue", pendientes: 5, progreso: 1, completadas: 4 },
  { name: "Vie", pendientes: 1, progreso: 5, completadas: 7 },
  { name: "Sáb", pendientes: 2, progreso: 2, completadas: 3 },
  { name: "Dom", pendientes: 1, progreso: 1, completadas: 2 },
]

export function TaskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Progreso de Tareas - Esta Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pendientes" fill="#f59e0b" name="Pendientes" />
            <Bar dataKey="progreso" fill="#3b82f6" name="En Progreso" />
            <Bar dataKey="completadas" fill="#10b981" name="Completadas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
