import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import usuariosFake from "../../data/usuariosFake.json";
import { isAfterNow, isBeforeNow } from "@/utils/utilsDate";
import toast from "react-hot-toast";

// 🧠 Tipos
interface JwtPayload {
    sub: string;
    username: string;
    roles: string[];
    iat: number;
    exp: number;
}

export interface User {
    id: string;
    username: string;
    password: string;
    roles: string[];
    jwt: string;
    jwt_payload: JwtPayload;
    FecIni: string;
    FecFin: string;
    EdoCta: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.JSX.Element | React.JSX.Element[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

// 🔐 Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // leer el localStorage para mantener la sesión
 

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError("");

            const users: User[] = usuariosFake.users;
            const foundUser = users.find(u => u.username === username);
            const idUser = foundUser ? foundUser.id : "";

            if (!foundUser) {
                logout();
                throw new Error("Credenciales inválidas");
            }

            // Validaciones de fechas y estado de cuenta
            if (isAfterNow(foundUser.FecIni)) {
                toast.error('Cuenta por activarse');
                logout();
                return false;
            }
            if (!foundUser.EdoCta && isBeforeNow(foundUser.FecFin)) {
                console.log(foundUser.EdoCta)
                toast.error('Cuenta deshabilitada');
                logout();
                return false;
            }

            if (isBeforeNow(foundUser.FecFin)) {
                fetch(`http://localhost:3001/api/usuarios/${idUser}/edocuenta`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ newState: false }),
                })
                    .then(res => res.json())
                    .then(data => console.log('Actualizado:', data))
                    .catch(err => console.error(err));

                toast.error('Cuenta vencida');
                foundUser.EdoCta = false;
                logout();
                return false;
            }

            if (!foundUser.EdoCta) {
            
                toast.error('Cuenta deshabilitada');
                console.log(foundUser.EdoCta)
                logout();
                return false;
            }

            if (foundUser.password !== password) {
                logout();
                throw new Error("Credenciales inválidas");
            }

            // Login exitoso
            setUser(foundUser);
            setIsAuthenticated(true);
            localStorage.setItem("token", foundUser.jwt);
            localStorage.setItem("user", JSON.stringify(foundUser));

            return true;

        } catch (err) {
            const message = err instanceof Error ? err.message : "Error desconocido";
            setError(message);
            setIsAuthenticated(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setError("");
        setLoading(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    useEffect(() => {
        console.log({ isAuthenticated })
    }, [isAuthenticated])


    // useMemo para memorizar el valor del contexto
    const contextValue = useMemo(() => ({
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout
    }), [user, isAuthenticated, loading, error]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
