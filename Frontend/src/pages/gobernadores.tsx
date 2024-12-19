import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importamos Link para la navegación
import { Gobernador } from "../types";

const GobernadoresPage: React.FC = () => {
  const [gobernadores, setGobernadores] = useState<Gobernador[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gobernadores")
      .then((response) => {
        setGobernadores(response.data.gobernadores);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gobernadores:", error);
      });
  }, []);

  const handleEliminar = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/gobernador/${id}`)
      .then(() => {
        // Actualizamos el estado eliminando al gobernador del array
        setGobernadores(
          gobernadores.filter((gobernador) => gobernador.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting gobernador:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Gobernadores
        </h1>
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Fecha de inicio</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Municipio</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left"></th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {gobernadores.map((gobernador) => (
              <tr key={gobernador.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{gobernador.persona.id}</td>
                <td className="px-4 py-2">{gobernador.persona.nombre}</td>
                <td className="px-4 py-2">{gobernador.fecha_registro}</td>
                <td className="px-4 py-2">
                  {gobernador.persona.municipio.departamento.nombre}
                </td>
                <td className="px-4 py-2">
                  {gobernador.persona.municipio.nombre}
                </td>
                <td className="px-4 py-2">
                  {gobernador.persona.vivienda.direccion}
                </td>

                <td className="px-4 flex py-2 text-center">
                  {/* Botón de detalle que usa Link para redirigir */}
                  <Link
                    to={`/gobernador/${gobernador.persona.id}`} // Redirige a la página de detalles
                    className="bg-teal-700 text-white py-1 px-4 rounded-md hover:bg-teal-800 transition"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => handleEliminar(gobernador.persona.id)} // Llama a la función de eliminación
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

export default GobernadoresPage;
