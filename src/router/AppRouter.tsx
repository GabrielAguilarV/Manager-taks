import { Route, Routes } from "react-router";

import { ManagerLayout } from "@/pages/layout/ManagerLayout";
import CalendarioPage from "@/pages/calendarioPage/CalendarioPage";
import EmpleadosPage from "@/pages/empleadosPage/EmpleadosPage";
import TareasPage from "@/pages/tasksPage/TasksPage";
import EmpresasPage from "@/pages/empresasPage/EmpreasPage";

import { LoginPageAuth } from "@/auth/components/LoginForms";
import { HorariosPage } from "@/pages/horariosPage/HorariosPage";
import { ConfiguracionPage } from "@/pages/configuracionPage/ConfiguracionPage";
import { useAuth } from "@/context/authContext/AuthContext";
import PermissionsPage from "@/pages/permisosPage/PermisosPage";
import Dashboard from "@/pages/dasboard/dashboard";
import HistorialPage from "@/pages/historialPage/HistorialPage";
import NotificacionesPage from "@/pages/notificacionesPage/NotificacionesPage";



interface Ruta {
  name: string;
  path: string;
  component: React.ReactNode;
}

export const AppRouter = () => {

  const { isAuthenticated } = useAuth();

  const rutas: Ruta[] = [

    {
      name: "Dashboard ",

      path: "/",
      component: <Dashboard />
    },
    {
      name: "Empresas",
      path: "/empresas",
      component: <EmpresasPage />
    },
    {
      name: "Tareas",
      path: "/tareas",
      component: <TareasPage />
    },
    {
      name: "Empleados",
      path: "/empleados",
      component: <EmpleadosPage />
    },
    {
      name: "Calendario",
      path: "/calendario",
      component: <CalendarioPage />
    },
    {
      name: "Permisos",
      path: "/permisos",
      component: < PermissionsPage/>
    },
    {
      name: "Horarios",
      path: "/horarios",
      component: <HorariosPage />
    },
    {
      name: "Historial",
      path: "/historial",
      component: <HistorialPage />
    },
    {
      name: "Notificaciones",
      path: "/notificaciones",
      component: <NotificacionesPage />
    },
    {
      name: "Configuracion",
      path: "/configuracion",
      component: <ConfiguracionPage />
    },

  ]


  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<LoginPageAuth />} />
        <Route path="*" element={<LoginPageAuth />} />
      </Routes>
    )
  }

  return (


    <Routes>

      <Route path="/auth" element={<LoginPageAuth />} />
      {/* 
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route> */}

      {
        isAuthenticated && (
          <Route path="/" element={<ManagerLayout />}>
            {
              rutas.map((ruta) => (
                <Route
                  key={ruta.name}
                  path={ruta.path}
                  element={ruta.component}
                />

              ))
            }

            <Route index element={<Dashboard />} />

          </Route>
        )
      }



      <Route path="*" element={<LoginPageAuth />} />
    </Routes>
  )
}

