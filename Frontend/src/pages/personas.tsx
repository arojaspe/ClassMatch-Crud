import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import { Persona } from "../types";

const PersonasPage: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/personas")
      .then((response) => {
        setPersonas(response.data.personas);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching personas:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Personas</h1>
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Tipo de Documento</th>
              <th className="px-4 py-2 text-left">Sexo</th>
              <th className="px-4 py-2 text-left">Fecha de Nacimiento</th>
              <th className="px-4 py-2 text-left"></th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (
              <tr key={persona.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{persona.id}</td>
                <td className="px-4 py-2">{persona.nombre}</td>
                <td className="px-4 py-2">{persona.tipo_doc}</td>
                <td className="px-4 py-2">{persona.sexo}</td>
                <td className="px-4 py-2">{persona.fecha_nac}</td>
                <td className="px-4 py-2 text-center">
                  {/* Botón de detalle que usa Link para redirigir */}
                  <Link
                    to={`/persona/${persona.id}`} // Redirige a la página de detalles
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                  >
                    Ver Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonasPage;
