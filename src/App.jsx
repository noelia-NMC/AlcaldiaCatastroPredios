import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./routes/privateRoute";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta pública para login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Redirección de la raíz a Dashboard si está autenticado */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
