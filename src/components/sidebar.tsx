import { useState } from "react"
import { NavLink, useLocation } from "react-router"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, CheckSquare, Users,  Settings, Menu, Home, Clock, Calendar, LogOut, Lock, History, Bell } from "lucide-react"
import { useAuth } from "@/context/authContext/AuthContext"

const navigation = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Empresas", icon: Building2, path: "/empresas", count: 3 },
  { name: "Tareas", icon: CheckSquare, path: "/tareas", count: 12 },
  { name: "Empleados", icon: Users, path: "/empleados", count: 24 },
  { name: "Horarios", icon: Clock, path: "/horarios" },
  { name: "Calendario", icon: Calendar, path: "/calendario" },
  { name: "Permisos", icon: Lock, path: "/permisos", count: undefined },
  { name: "Historial", icon: History, path: "/historial" },
  { name: "Notificaciones", icon: Bell, path: "/notificaciones" },
  // { name: "Reportes", icon: BarChart3, path: "/reportes" },
  { name: "Configuración", icon: Settings, path: "/configuracion" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation();

  const { login, error, loading, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {

    logout();

  }

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-slate-900 text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"
        } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && <h1 className="text-xl font-bold text-blue-400">AdminPro</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-slate-800"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="block"
            >
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${isActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-300 hover:text-white hover:bg-slate-800"
                  } ${collapsed ? "px-2" : "px-3"}`}
              >
                <Icon className={`h-4 w-4 ${collapsed ? "" : "mr-3"}`} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.count && (
                      <Badge
                        variant="secondary"
                        className="ml-auto bg-slate-700 text-gray-300"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </>
                )}
              </Button>



            </NavLink>
          )
        })}


      </nav>
      {/* Logout */}
      <div className="p-4 mt-auto border-t border-slate-700">
        <NavLink to="/logout" className="block">
          <Button
            variant="ghost"
            className={`w-full justify-start text-left ${collapsed ? "px-2" : "px-3"
              } text-gray-300 hover:text-white hover:bg-slate-800`}
            onClick={handleLogout}
          >
            <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-3"}`} />
            {!collapsed && <span>Cerrar Sesión</span>}
          </Button>
        </NavLink>
      </div>
    </div>
  )
}
