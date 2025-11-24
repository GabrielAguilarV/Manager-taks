
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { MoreHorizontal, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { PermissionsDialog } from './permiso-dialog'

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

const mockData: Permission[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  usuario: `Usuario ${i + 1}`,
  email: `usuario${i + 1}@empresa.com`,
  empresa: i % 3 === 0 ? 'Empresa A' : i % 3 === 1 ? 'Empresa B' : 'Empresa C',
  lectura: true,
  escritura: i % 2 === 0,
  edicion: i % 3 === 0,
  eliminacion: i % 5 === 0,
  reportes: i % 2 === 0,
  configuracion: i % 4 === 0,
  estado: i % 7 !== 0 ? 'activo' : 'inactivo',
}))

const ITEMS_PER_PAGE = 10

export function PermissionsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set())
  const [showDialog, setShowDialog] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null)

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = mockData.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPermissions(new Set(paginatedData.map(p => p.id)))
    } else {
      setSelectedPermissions(new Set())
    }
  }

  const handleSelectPermission = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedPermissions)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedPermissions(newSelected)
  }

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission)
    setShowDialog(true)
  }

  const handleDelete = (id: string) => {
    console.log('Eliminar permiso:', id)
  }

  const handleAddNew = () => {
    setSelectedPermission(null)
    setShowDialog(true)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPermissions.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead className="text-center">Lectura</TableHead>
                <TableHead className="text-center">Escritura</TableHead>
                <TableHead className="text-center">Edición</TableHead>
                <TableHead className="text-center">Eliminación</TableHead>
                <TableHead className="text-center">Reportes</TableHead>
                <TableHead className="text-center">Config</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((permission) => (
                <TableRow key={permission.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedPermissions.has(permission.id)}
                      onCheckedChange={(checked) =>
                        handleSelectPermission(permission.id, !!checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{permission.usuario}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{permission.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{permission.empresa}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {permission.lectura ? (
                      <Eye className="w-4 h-4 mx-auto text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 mx-auto text-gray-400" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={permission.escritura ? 'default' : 'secondary'} className="mx-auto">
                      {permission.escritura ? 'Sí' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={permission.edicion ? 'default' : 'secondary'} className="mx-auto">
                      {permission.edicion ? 'Sí' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={permission.eliminacion ? 'destructive' : 'secondary'} className="mx-auto">
                      {permission.eliminacion ? 'Sí' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={permission.reportes ? 'default' : 'secondary'} className="mx-auto">
                      {permission.reportes ? 'Sí' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={permission.configuracion ? 'default' : 'secondary'} className="mx-auto">
                      {permission.configuracion ? 'Sí' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={permission.estado === 'activo' ? 'default' : 'secondary'}
                      className="mx-auto"
                    >
                      {permission.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(permission)}>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(permission.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/30">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(endIndex, mockData.length)} de {mockData.length} permisos
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>

      <PermissionsDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        permission={selectedPermission}
      />
    </>
  )
}
