import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Alcalde } from "../types"; // Asegúrate de tener el tipo 'Alcalde' definido en tu archivo types

const AlcaldesPage: React.FC = () => {
  const [alcaldes, setAlcaldes] = useState<Alcalde[]>([]);
  const [formData, setFormData] = useState({
    id_persona: 0,
    id_municipio: 0,
    fecha_registro: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Cargar los datos de los alcaldes
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/alcaldes")
      .then((response) => {
        setAlcaldes(response.data.alcaldes);
      })
      .catch((error) => {
        console.error("Error fetching alcaldes:", error);
        window.location.reload();
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!formData.id_persona || !formData.id_municipio || !formData.fecha_registro) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Validar valores negativos para id_persona e id_municipio
    if (formData.id_persona < 0 || formData.id_municipio < 0) {
      setError("Los valores de ID no pueden ser negativos.");
      return;
    }

    // Preparar los datos en el formato correcto para el backend
    const alcaldeData = {
      id_persona: formData.id_persona,
      id_municipio: formData.id_municipio,
      fecha_registro: formData.fecha_registro,
    };

    axios
      .post("http://localhost:5000/api/alcalde", alcaldeData)
      .then((response) => {
        setAlcaldes([...alcaldes, response.data.alcalde]); // Añadimos el nuevo alcalde al estado
        setFormData({
          id_persona: 0,
          id_municipio: 0,
          fecha_registro: "",
        }); // Limpiar el formulario
        setError(null); // Limpiar errores
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding alcalde:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Alcaldes</h1>

        {/* Formulario para añadir nuevo alcalde */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Añadir Alcalde
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">ID de Persona:</label>
              <input
                type="number"
                name="id_persona"
                value={formData.id_persona}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700">ID de Municipio:</label>
              <input
                type="number"
                name="id_municipio"
                value={formData.id_municipio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700">Fecha de Registro:</label>
              <input
                type="date"
                name="fecha_registro"
                value={formData.fecha_registro}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit" // Cambiamos a "submit" para que funcione correctamente con el formulario
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md w-full"
            >
              Añadir
            </button>
          </form>
        </div>

        {/* Tabla de Alcaldes sin la columna ID */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">ID de Persona</th>
              <th className="px-4 py-2 text-left">ID de Municipio</th>
              <th className="px-4 py-2 text-left">Fecha de Registro</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {alcaldes.map((alcalde) => (
              <tr key={alcalde.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{alcalde.id_persona}</td>
                <td className="px-4 py-2">{alcalde.id_municipio}</td>
                <td className="px-4 py-2">{alcalde.fecha_registro}</td>
                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/alcalde/${alcalde.id_persona}`}
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

export default AlcaldesPage;
