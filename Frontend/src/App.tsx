import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonasPage from "./pages/personas";
import DetallePersonaPage from "./pages/detallePersona";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/personas" element={<PersonasPage />} />
        <Route path="/personas/:id" element={<DetallePersonaPage />} />{" "}
        {/* Ruta dinámica */}
      </Routes>
    </Router>
  );
}

export default App;
