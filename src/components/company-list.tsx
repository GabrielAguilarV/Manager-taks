import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Building2, Plus, Search, MoreVertical, Users, CheckSquare } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useForm } from "react-hook-form"

const companies: 
  EmpresaFormData[] = [
  {
    id: 1,
    name: "Constructora del Norte",
    industry: "Construcción",
    employees: 12,
    activeTasks: 8,
    color: "bg-blue-500",

    // campos de EmpresaFormData
    entidad: "constructora",
    tipoEntidad: "industrial",
    responsableArea: "Juan Pérez",
    fechaConstitucion: "2010-05-12",
    descripcion: "Empresa dedicada a obras civiles y construcción pesada.",
    direccionNumero: "123",
    direccionCalle: "Av. Norte",
    direccionColonia: "Centro",
    direccionMunicipio: "Monterrey",
    direccionEstado: "Nuevo León",
    direccionCodigo: "64000",
    direccionPais: "México",
  },
  {
    id: 2,
    name: "Restaurante El Sabor",
    industry: "Gastronomía",
    employees: 8,
    activeTasks: 5,
    color: "bg-orange-500",

    // campos de EmpresaFormData
    entidad: "restaurante",
    tipoEntidad: "comercial",
    responsableArea: "María López",
    fechaConstitucion: "2018-03-20",
    descripcion: "Restaurante de comida tradicional y eventos privados.",
    direccionNumero: "45",
    direccionCalle: "Calle del Parque",
    direccionColonia: "Centro",
    direccionMunicipio: "Guadalajara",
    direccionEstado: "Jalisco",
    direccionCodigo: "44100",
    direccionPais: "México",
  },
  {
    id: 3,
    name: "Tech Solutions",
    industry: "Tecnología",
    employees: 15,
    activeTasks: 12,
    color: "bg-purple-500",

    // campos de EmpresaFormData
    entidad: "servicios",
    tipoEntidad: "servicios",
    responsableArea: "Carlos Gómez",
    fechaConstitucion: "2015-09-01",
    descripcion: "Desarrollo de software y consultoría tecnológica.",
    direccionNumero: "890",
    direccionCalle: "Paseo Tecnológico",
    direccionColonia: "Parque Industrial",
    direccionMunicipio: "Zapopan",
    direccionEstado: "Jalisco",
    direccionCodigo: "45200",
    direccionPais: "México",
  },
]
interface EmpresaFormData {
  id?: number;
  name: string;
  industry: string;
  employees: number;
  activeTasks: number;
  color: string;
  entidad: string;
  tipoEntidad: string;
  responsableArea: string;
  fechaConstitucion: string;
  descripcion: string;
  direccionNumero: string;
  direccionCalle: string;
  direccionColonia: string;
  direccionMunicipio: string;
  direccionEstado: string;
  direccionCodigo: string;  
  direccionPais: string;
}

export function CompanyList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [empresas, setEmpresas] = useState(companies);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpresaFormData>({
    defaultValues: {
      direccionPais: "México",
    },
  });

  const handleCreateCompany = (data: EmpresaFormData) => {
    const nuevaEmpresa = {
      id: empresas.length + 1,
      ...data,
    };

    console.log({data})
    setEmpresas([...empresas, nuevaEmpresa]);
    setIsDialogOpen(false);
    reset(); // Limpia el formulario
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
          <p className="text-gray-600 mt-1">Gestiona todas tus empresas desde un solo lugar</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Empresa
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Empresa</DialogTitle>
              <DialogDescription>
                Agrega una nueva empresa a tu sistema de gestión
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(handleCreateCompany)}
              className="space-y-4 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Nombre de la Empresa</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Mi Empresa S.A."
                    {...(register("name" as any, { required: "Ingresa el nombre de la empresa" }))}
                  />
                  {(errors as any).name && (
                    <p className="text-red-500 text-sm">{(errors as any).name.message}</p>
                  )}
                </div>
                {/* Entidad */}
                <div className="space-y-2">
                  <Label htmlFor="entidad">Entidad</Label>
                  <select
                    id="entidad"
                    className="w-full px-3 py-2 rounded-md border bg-white"
                    {...register("entidad", { required: "Selecciona una entidad" })}
                  >
                    <option value="">Selecciona una...</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="despacho">Despacho</option>
                    <option value="aserradero">Aserradero</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.entidad && (
                    <p className="text-red-500 text-sm">{errors.entidad.message}</p>
                  )}
                </div>

                {/* Tipo de Entidad */}
                <div className="space-y-2">
                  <Label htmlFor="tipoEntidad">Tipo de Entidad</Label>
                  <select
                    id="tipoEntidad"
                    className="w-full px-3 py-2 rounded-md border bg-white"
                    {...register("tipoEntidad", {
                      required: "Selecciona un tipo de entidad",
                    })}
                  >
                    <option value="">Selecciona una...</option>
                    <option value="comercial">Comercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="servicios">Servicios</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.tipoEntidad && (
                    <p className="text-red-500 text-sm">
                      {errors.tipoEntidad.message}
                    </p>
                  )}
                </div>

                {/* Responsable */}
                <div className="space-y-2">
                  <Label htmlFor="responsableArea">Responsable de Área</Label>
                  <Input
                    id="responsableArea"
                    placeholder="Nombre del responsable"
                    {...register("responsableArea", {
                      required: "Campo obligatorio",
                    })}
                  />
                  {errors.responsableArea && (
                    <p className="text-red-500 text-sm">
                      {errors.responsableArea.message}
                    </p>
                  )}
                </div>

                {/* Fecha */}
                <div className="space-y-2">
                  <Label htmlFor="fechaConstitucion">Fecha de Constitución</Label>
                  <Input
                    id="fechaConstitucion"
                    type="date"
                    {...register("fechaConstitucion", {
                      required: "Selecciona una fecha",
                    })}
                  />
                  {errors.fechaConstitucion && (
                    <p className="text-red-500 text-sm">
                      {errors.fechaConstitucion.message}
                    </p>
                  )}
                </div>

                {/* Descripción */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Input
                    id="descripcion"
                    placeholder="Breve descripción de la empresa"
                    {...register("descripcion")}
                  />
                </div>
              </div>

              {/* Dirección */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="direccionNumero">Número</Label>
                    <Input
                      id="direccionNumero"
                      placeholder="Ej: 123"
                      {...register("direccionNumero")}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="direccionCalle">Calle</Label>
                    <Input
                      id="direccionCalle"
                      placeholder="Ej: Av. Principal"
                      {...register("direccionCalle")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="direccionColonia">Colonia</Label>
                    <Input
                      id="direccionColonia"
                      placeholder="Ej: Centro"
                      {...register("direccionColonia")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccionMunicipio">Municipio</Label>
                    <Input
                      id="direccionMunicipio"
                      placeholder="Ej: Guadalajara"
                      {...register("direccionMunicipio")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccionEstado">Estado</Label>
                    <Input
                      id="direccionEstado"
                      placeholder="Ej: Jalisco"
                      {...register("direccionEstado")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccionCodigo">Código Postal</Label>
                    <Input
                      id="direccionCodigo"
                      placeholder="Ej: 44100"
                      {...register("direccionCodigo")}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="direccionPais">País</Label>
                    <Input
                      id="direccionPais"
                      {...register("direccionPais")}
                      defaultValue="México"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Crear Empresa
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar empresas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {empresas.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={` p-3 rounded-lg ${company.color ? company.color : 'bg-gray-500'}`}>
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription>{company.industry || company.entidad}</CardDescription>
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
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Empleados</span>
                  </div>
                  <Badge variant="secondary">{company.employees}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckSquare className="h-4 w-4" />
                    <span>Tareas Activas</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{company.activeTasks}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
