import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext/AuthContext";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginPageAuth() {
  const { login, error, loading, isAuthenticated} = useAuth();

  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  // 📤 Handler del login
  const onSubmit = async (data: LoginFormData) => {
    const isAuthenticated = await login(data.username, data.password);

  
    if(isAuthenticated){
      reset()
      navigate("/")
    }

    reset()
  
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);



  }

  // 🧾 Formulario de login
  return (
    <div className="h-screen flex">
      {/* Imagen lateral */}
      <div
        className="hidden lg:flex w-full lg:w-1/2 justify-around items-center relative"
        style={{
          background: "url('/logo.png') center center / cover no-repeat",
        }}
      ></div>

      {/* Formulario */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-md shadow-2xl p-5"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              ¡Hola de nuevo!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Bienvenido
            </p>

            {/* Username */}
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                {...register("username", { required: "El usuario es obligatorio" })}
                className="pl-2 w-full outline-none border-none"
                type="text"
                placeholder="Usuario"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mb-2">
                {errors.username.message}
              </p>
            )}

            {/* Password */}
            {/* Password */}
            <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                {...register("password", { required: "La contraseña es obligatoria" })}
                className="pl-2 w-full outline-none border-none"
                type={isShowPassword ? "text" : "password"} // Aquí usamos el state
                placeholder="Contraseña"
              />

              {/* Botón de ojo */}
              <button
                type="button"
                onClick={handleShowPassword}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                {isShowPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {/* Icono de ojo abierto */}
                    <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                    <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {/* Icono de ojo tachado */}
                    <path d="M4.03 3.97a.75.75 0 10-1.06 1.06l1.3 1.3C3.18 7.32 2 9.51 2 10c.73 2.89 4 7 9 7 1.73 0 3.33-.53 4.64-1.43l1.36 1.36a.75.75 0 101.06-1.06L4.03 3.97zM10 15a5 5 0 01-5-5c0-.49.18-1.17.47-1.71l1.66 1.66a3 3 0 004.15 4.15l1.66 1.66A4.97 4.97 0 0110 15z" />
                  </svg>
                  
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            {/* Botón de login */}
            <Button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Login"}
            </Button>

            {error && (
              <p className="text-red-600 text-center mt-3 text-sm">{error}</p>
            )}

            <div className="flex justify-between mt-4">
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                ¿Olvidaste tu contraseña?
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
