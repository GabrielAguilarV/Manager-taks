import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Employee } from '@/context/employedContext/EmployedContext'

export type Task = {
  id: string
  title: string
  descripcion?: string
  empresa?: string
  responsableId?: string
  estado?: string
  prioridad?: string
  tiempoValorado?: number
  fechaInicio?: string
  fechaFin?: string
}

type TaskContextValue = {
  tasks: Task[]
  addTask: (t: Omit<Task, 'id'>) => Task
  assignTask: (taskId: string, employeeId: string) => void
  updateTask: (taskId: string, changes: Partial<Task>) => void
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined)

const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Revisión de planos arquitectónicos',
    descripcion: 'Revisar y aprobar los planos de construcción del proyecto residencial. Verificar medidas, materiales y normativas.',
    empresa: 'Constructora López',
    responsableId: 'e1',
    estado: 'en-proceso',
    prioridad: 'alta',
    tiempoValorado: 6,
    fechaInicio: '2025-11-26',
    fechaFin: '2025-11-28'
  },
  {
    id: 'task-2',
    title: 'Actualización de menú mensual',
    descripcion: 'Diseñar y actualizar el menú del mes con platillos de temporada. Coordinar con proveedores.',
    empresa: 'Restaurante El Buen Sabor',
    responsableId: 'e2',
    estado: 'pendiente',
    prioridad: 'media',
    tiempoValorado: 4,
    fechaInicio: '2025-11-28',
    fechaFin: '2025-11-30'
  },
  {
    id: 'task-3',
    title: 'Desarrollo de módulo de reportes',
    descripcion: 'Implementar sistema de reportes con exportación a PDF y Excel. Incluye gráficas y filtros avanzados.',
    empresa: 'Tech Solutions',
    responsableId: 'e3',
    estado: 'en-proceso',
    prioridad: 'alta',
    tiempoValorado: 16,
    fechaInicio: '2025-11-25',
    fechaFin: '2025-12-05'
  },
  {
    id: 'task-4',
    title: 'Inspección de seguridad en obra',
    descripcion: 'Realizar inspección completa de medidas de seguridad en la obra. Generar reporte fotográfico.',
    empresa: 'Constructora López',
    responsableId: 'e4',
    estado: 'pendiente',
    prioridad: 'alta',
    tiempoValorado: 3,
    fechaInicio: '2025-11-27',
    fechaFin: '2025-11-27'
  },
  {
    id: 'task-5',
    title: 'Reunión de seguimiento con cliente',
    descripcion: 'Presentar avances del proyecto y resolver dudas del cliente. Preparar documentación de soporte.',
    empresa: 'Tech Solutions',
    responsableId: 'e5',
    estado: 'pendiente',
    prioridad: 'media',
    tiempoValorado: 2,
    fechaInicio: '2025-12-02',
    fechaFin: '2025-12-02'
  },
  {
    id: 'task-6',
    title: 'Inventario de almacén',
    descripcion: 'Realizar conteo físico del inventario y actualizar sistema. Identificar productos de baja rotación.',
    empresa: 'Restaurante El Buen Sabor',
    responsableId: 'e2',
    estado: 'completado',
    prioridad: 'baja',
    tiempoValorado: 5,
    fechaInicio: '2025-11-20',
    fechaFin: '2025-11-21'
  },
  {
    id: 'task-7',
    title: 'Capacitación de personal nuevo',
    descripcion: 'Inducción y capacitación del equipo de cocina. Incluye protocolos de higiene y seguridad alimentaria.',
    empresa: 'Restaurante El Buen Sabor',
    responsableId: 'e1',
    estado: 'en-proceso',
    prioridad: 'media',
    tiempoValorado: 8,
    fechaInicio: '2025-12-10',
    fechaFin: '2025-12-12'
  },
  {
    id: 'task-8',
    title: 'Migración de base de datos',
    descripcion: 'Migrar base de datos a servidor en la nube. Incluye respaldos y pruebas de integridad.',
    empresa: 'Tech Solutions',
    responsableId: 'e3',
    estado: 'pendiente',
    prioridad: 'alta',
    tiempoValorado: 12,
    fechaInicio: '2025-12-15',
    fechaFin: '2025-12-17'
  },
  {
    id: 'task-9',
    title: 'Mantenimiento preventivo de equipos',
    descripcion: 'Revisión y mantenimiento de maquinaria de cocina. Cambio de filtros y limpieza profunda.',
    empresa: 'Restaurante El Buen Sabor',
    responsableId: 'e4',
    estado: 'pendiente',
    prioridad: 'media',
    tiempoValorado: 4,
    fechaInicio: '2025-11-29',
    fechaFin: '2025-11-29'
  },
  {
    id: 'task-10',
    title: 'Auditoría de calidad',
    descripcion: 'Evaluación de procesos constructivos y verificación de estándares de calidad del proyecto.',
    empresa: 'Constructora López',
    responsableId: 'e5',
    estado: 'pendiente',
    prioridad: 'alta',
    tiempoValorado: 5,
    fechaInicio: '2025-12-03',
    fechaFin: '2025-12-04'
  }
]

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const STORAGE_KEY = 'mt:tasks'

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      if (typeof window === 'undefined') return sampleTasks
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return sampleTasks
      const stored = JSON.parse(raw) as Task[]
      return stored.length > 0 ? stored : sampleTasks
    } catch (err) {
      return sampleTasks
    }
  })

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      // ignore
    }
  }, [tasks])

  function addTask(t: Omit<Task, 'id'>) {
    const newTask: Task = { ...t, id: String(Date.now()) }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  function assignTask(taskId: string, employeeId: string) {
    setTasks((prev) => prev.map(tsk => tsk.id === taskId ? { ...tsk, responsableId: employeeId } : tsk))
  }

  function updateTask(taskId: string, changes: Partial<Task>) {
    setTasks((prev) => prev.map(tsk => tsk.id === taskId ? { ...tsk, ...changes } : tsk))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, assignTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used within TaskProvider')
  return ctx
}

export default TaskProvider
