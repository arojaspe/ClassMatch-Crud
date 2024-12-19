import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import { Vivienda } from "../types";

const ViviendasPage: React.FC = () => {
  const [viviendas, setViviendas] = useState<Vivienda[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/viviendas")
      .then((response) => {
        setViviendas(response.data.viviendas); // Cambié el nombre del estado a "viviendas"
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching viviendas:", error);
      });
  }, []);

  const handleEliminar = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/vivienda/${id}`)
      .then(() => {
        // Actualizamos el estado eliminando la vivienda del array
        setViviendas(viviendas.filter((vivienda) => vivienda.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting vivienda:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Viviendas</h1>
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Tipo de vivienda</th>
              <th className="px-4 py-2 text-left">Estrato</th>
              <th className="px-4 py-2 text-left">Área</th>
              <th className="px-4 py-2 text-left">Capacidad</th>
              <th className="px-4 py-2 text-left"></th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {viviendas.map((vivienda) => (
              <tr key={vivienda.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{vivienda.id}</td>
                <td className="px-4 py-2">{vivienda.direccion}</td>
                <td className="px-4 py-2">{vivienda.categoria}</td>
                <td className="px-4 py-2">{vivienda.estrato}</td>
                <td className="px-4 py-2">{vivienda.area}</td>
                <td className="px-4 py-2">{vivienda.capacidad}</td>
                <td className="px-4 py-2 flex text-center">
                  {/* Botón de detalle que usa Link para redirigir */}
                  <Link
                    to={`/vivienda/${vivienda.id}`} // Redirige a la página de detalles
                    className="bg-teal-700 text-white py-1 px-4 rounded-md hover:bg-teal-800 transition"
                  >
                    Ver Detalles
                  </Link>
                  <button
                    onClick={() => handleEliminar(vivienda.id)} // Llama a la función de eliminación
                    className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition ml-4"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViviendasPage;
