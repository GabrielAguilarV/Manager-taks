import { BrowserRouter } from "react-router"
import { AppRouter } from "./router/AppRouter"
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./context/authContext/AuthContext"


function App() {


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <LoginPage /> */}
          <AppRouter />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
