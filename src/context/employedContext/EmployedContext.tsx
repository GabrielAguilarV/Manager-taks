import React, { createContext, useContext, useEffect, useState } from 'react'

export interface Employee {
  id: string
  name: string
  role?: string
  company?: string
  email?: string
  phone?: string
  avatar?: string
  activeTasks?: number
}

type EmployeeContextValue = {
  employees: Employee[]
  addEmployee: (e: Omit<Employee, 'id' | 'activeTasks'>) => Employee
  incrementActiveTasks: (id: string) => void
  companies: string[]
  addCompany: (name: string) => void
}

const EmployeeContext = createContext<EmployeeContextValue | undefined>(undefined)

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const STORAGE_KEY = 'mt:employees'
  const COMPANIES_KEY = 'mt:companies'

  const sampleCompanies = [
    'Constructora del Norte',
    'Restaurante El Sabor',
    'Tech Solutions',
  ]

  const sampleEmployees: Employee[] = [
    { id: 'e1', name: 'Carlos Méndez', role: 'Encargado', company: sampleCompanies[0], email: 'carlos@constructora.com', phone: '+56 9 1234 5678', avatar: '/professional-man.jpg', activeTasks: 3 },
    { id: 'e2', name: 'María González', role: 'Chef', company: sampleCompanies[1], email: 'maria@elsabor.com', phone: '+56 9 8765 4321', avatar: '/professional-woman-diverse.png', activeTasks: 2 },
    { id: 'e3', name: 'Juan Pérez', role: 'Desarrollador', company: sampleCompanies[2], email: 'juan@techsolutions.com', phone: '+56 9 5555 6666', avatar: '/developer-man.png', activeTasks: 5 },
    { id: 'e4', name: 'Ana Martínez', role: 'Diseñadora', company: sampleCompanies[2], email: 'ana@techsolutions.com', phone: '+56 9 7777 8888', avatar: '/stylish-woman.png', activeTasks: 4 },
    { id: 'e5', name: 'Pedro Ramírez', role: 'Supervisor', company: sampleCompanies[0], email: 'pedro@constructora.com', phone: '+56 9 9999 0000', avatar: '/supervisor-man.jpg', activeTasks: 2 },
  ]

  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      if (typeof window === 'undefined') return sampleEmployees
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return sampleEmployees
      return JSON.parse(raw) as Employee[]
    } catch (err) {
      return sampleEmployees
    }
  })

  const [companies, setCompanies] = useState<string[]>(() => {
    try {
      if (typeof window === 'undefined') return sampleCompanies
      const raw = localStorage.getItem(COMPANIES_KEY)
      if (!raw) return sampleCompanies
      return JSON.parse(raw) as string[]
    } catch (err) {
      return sampleCompanies
    }
  })

  // persist employees
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
    } catch (err) {
      // ignore
    }
  }, [employees])

  // persist companies
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies))
    } catch (err) {
      // ignore
    }
  }, [companies])

  function addEmployee(e: Omit<Employee, 'id' | 'activeTasks'>) {
    const newEmployee: Employee = {
      ...e,
      id: String(Date.now()),
      activeTasks: 0,
    }
    setEmployees((prev) => [newEmployee, ...prev])
    return newEmployee
  }

  function incrementActiveTasks(id: string) {
    setEmployees((prev) => prev.map(emp => emp.id === id ? { ...emp, activeTasks: (emp.activeTasks || 0) + 1 } : emp))
  }

  function addCompany(name: string) {
    setCompanies((prev) => (prev.includes(name) ? prev : [...prev, name]))
  }

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, incrementActiveTasks, companies, addCompany }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployees() {
  const ctx = useContext(EmployeeContext)
  if (!ctx) throw new Error('useEmployees must be used within EmployeeProvider')
  return ctx
}

export default EmployeeProvider
