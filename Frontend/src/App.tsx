import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonasPage from "./pages/personas";
import DetallePersonaPage from "./pages/detallePersona";
import ViviendasPage from "./pages/viviendas";
import Header from "./components/Header";
import DetalleViviendaPage from "./pages/detalleVivienda";
import GobernadoresPage from "./pages/gobernadores";
import DetalleGobernadorPage from "./pages/detalleGobernador";
import AlcaldesPage from "./pages/alcaldes";
import DetalleAlcaldePage from "./pages/detalleAlcalde";

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        {/* Header agregado al inicio */}
        <Header />

        {/* Contenido Principal */}
        <main className="px-4 py-6">
          <Routes>
            <Route path="/personas" element={<PersonasPage />} />
            <Route path="/persona/:id" element={<DetallePersonaPage />} />
            <Route path="/viviendas" element={<ViviendasPage />} />
            <Route path="/vivienda/:id" element={<DetalleViviendaPage />} />
            <Route path="/gobernadores" element={<GobernadoresPage />} />
            <Route path="/gobernador/:id" element={<DetalleGobernadorPage />} />
            <Route path="/alcaldes" element={<AlcaldesPage />} />
            <Route path="/alcalde/:id" element={<DetalleAlcaldePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>ClassMatch CRUD</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
