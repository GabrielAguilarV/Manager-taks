'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card } from '@/components/ui/card'

interface Permission {
  id: string
  usuario: string
  email: string
  empresa: string
  lectura: boolean
  escritura: boolean
  edicion: boolean
  eliminacion: boolean
  reportes: boolean
  configuracion: boolean
  estado: 'activo' | 'inactivo'
}

interface PermissionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  permission?: Permission | null
}

export function PermissionsDialog({
  open,
  onOpenChange,
  permission,
}: PermissionsDialogProps) {
  const [formData, setFormData] = useState<Permission>({
    id: '',
    usuario: '',
    email: '',
    empresa: '',
    lectura: true,
    escritura: false,
    edicion: false,
    eliminacion: false,
    reportes: false,
    configuracion: false,
    estado: 'activo',
  })

  useEffect(() => {
    if (permission) {
      setFormData(permission)
    } else {
      setFormData({
        id: '',
        usuario: '',
        email: '',
        empresa: '',
        lectura: true,
        escritura: false,
        edicion: false,
        eliminacion: false,
        reportes: false,
        configuracion: false,
        estado: 'activo',
      })
    }
  }, [permission, open])

  const handlePermissionChange = (key: keyof Permission) => {
    setFormData(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = () => {
    console.log('Guardando permisos:', formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {permission ? 'Editar Permisos' : 'Agregar Nuevos Permisos'}
          </DialogTitle>
          <DialogDescription>
            Configura los permisos de acceso para el usuario
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Nombre de Usuario *</Label>
              <Input
                id="usuario"
                placeholder="Ej: Juan Pérez"
                value={formData.usuario}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, usuario: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ej: juan@empresa.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa *</Label>
              <Select value={formData.empresa} onValueChange={(value) =>
                setFormData(prev => ({ ...prev, empresa: value }))
              }>
                <SelectTrigger id="empresa">
                  <SelectValue placeholder="Selecciona una empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Empresa A">Empresa A</SelectItem>
                  <SelectItem value="Empresa B">Empresa B</SelectItem>
                  <SelectItem value="Empresa C">Empresa C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Select value={formData.estado} onValueChange={(value) =>
                setFormData(prev => ({ ...prev, estado: value as 'activo' | 'inactivo' }))
              }>
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="p-4 bg-muted/30">
            <h3 className="font-semibold mb-4 text-foreground">Permisos de Acceso</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lectura"
                  checked={formData.lectura}
                  onCheckedChange={() => handlePermissionChange('lectura')}
                />
                <Label htmlFor="lectura" className="font-normal cursor-pointer">
                  Lectura (Ver datos)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="escritura"
                  checked={formData.escritura}
                  onCheckedChange={() => handlePermissionChange('escritura')}
                />
                <Label htmlFor="escritura" className="font-normal cursor-pointer">
                  Escritura (Crear datos)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edicion"
                  checked={formData.edicion}
                  onCheckedChange={() => handlePermissionChange('edicion')}
                />
                <Label htmlFor="edicion" className="font-normal cursor-pointer">
                  Edición (Modificar datos)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="eliminacion"
                  checked={formData.eliminacion}
                  onCheckedChange={() => handlePermissionChange('eliminacion')}
                />
                <Label htmlFor="eliminacion" className="font-normal cursor-pointer">
                  Eliminación (Borrar datos)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reportes"
                  checked={formData.reportes}
                  onCheckedChange={() => handlePermissionChange('reportes')}
                />
                <Label htmlFor="reportes" className="font-normal cursor-pointer">
                  Reportes (Acceso a reportes)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="configuracion"
                  checked={formData.configuracion}
                  onCheckedChange={() => handlePermissionChange('configuracion')}
                />
                <Label htmlFor="configuracion" className="font-normal cursor-pointer">
                  Configuración (Ajustes admin)
                </Label>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {permission ? 'Guardar Cambios' : 'Crear Permisos'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
