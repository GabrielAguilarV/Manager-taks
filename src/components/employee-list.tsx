import { useState } from "react"
import { useEmployees } from '@/context/employedContext/EmployedContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Mail, Phone, Building2, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"



export function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { employees, addEmployee, companies } = useEmployees()

  // form state
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleAdd() {
    if (!name) return
    addEmployee({ name, role, company, email, phone })
    setName('')
    setRole('')
    setCompany('')
    setEmail('')
    setPhone('')
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empleados</h1>
          <p className="text-gray-600 mt-1">Administra tu equipo de trabajo</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Empleado
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
              <DialogDescription>Registra un nuevo miembro del equipo</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4 px-0 md:px-0">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Información Personal</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-name">Nombre(s) *</Label>
                    <Input id="employee-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan Carlos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-lastname1">Apellido Paterno *</Label>
                    <Input id="employee-lastname1" placeholder="Ej: Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-lastname2">Apellido Materno *</Label>
                    <Input id="employee-lastname2" placeholder="Ej: González" />
                  </div>
                </div>
              </div>

              {/* Información Laboral */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Información Laboral</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-position">Puesto *</Label>
                    <Input id="employee-position" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ej: Desarrollador, Chef" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-hire-date">Fecha de Contratación *</Label>
                    <Input id="employee-hire-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-company">Empresa *</Label>
                  <Select value={company} onValueChange={(v) => setCompany(v)}>
                    <SelectTrigger id="employee-company">
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Información de Contacto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-email">Email *</Label>
                    <Input id="employee-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="juan@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-phone">Teléfono *</Label>
                    <Input id="employee-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="442 123 4567" />
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-700">Dirección</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-street">Calle</Label>
                    <Input id="employee-street" placeholder="Ej: Av. Revolución" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-number">Número</Label>
                    <Input id="employee-number" placeholder="Ej: 123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-colonia">Colonia</Label>
                    <Input id="employee-colonia" placeholder="Ej: Centro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-municipio">Municipio</Label>
                    <Input id="employee-municipio" placeholder="Ej: Querétaro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-estado">Estado</Label>
                    <Input id="employee-estado" placeholder="Ej: Querétaro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-cp">Código Postal</Label>
                    <Input id="employee-cp" placeholder="Ej: 76000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-pais">País</Label>
                    <Input id="employee-pais" placeholder="Ej: México" defaultValue="México" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 bg-white">
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAdd}>
                  Agregar Empleado
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>



      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar empleados..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())).map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                    <DropdownMenuItem>Asignar tarea</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4" />
                <span>{employee.company}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tareas activas</span>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{employee.activeTasks}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
