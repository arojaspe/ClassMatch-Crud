// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Municipio } from "../types";

const MunicipiosPage: React.FC = () => {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    id_departamento: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/municipios")
      .then((response) => {
        setMunicipios(response.data.municipio);
        console.log(response.data.municipio);
      })
      .catch((error) => {
        console.error("Error fetching municipios:", error);
        window.location.reload();
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!formData.nombre || !formData.id_departamento) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Preparar los datos en el formato correcto para el backend
    const municipioData = {
      nombre: formData.nombre,
      id_departamento: formData.id_departamento, // La fecha ya debería estar en formato adecuado
    };

    axios
      .post(`http://localhost:5000/api/municipio/${formData.id}`, municipioData)
      .then((response) => {
        setMunicipios([...municipios, response.data.municipio]); // Añadimos la nueva municipio al estado
        setFormData({
          id: "",
          nombre: "",
          id_departamento: "",
        }); // Limpiar el formulario
        setError(null); // Limpiar errores
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding municipio:", error);
      });
  };

  // Función para manejar la eliminación de una municipio
  const handleEliminar = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/municipio/${id}`)
      .then(() => {
        // Actualizamos el estado eliminando la municipio del array
        setMunicipios(municipios.filter((municipio) => municipio.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting municipio:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Municipios</h1>

        {/* Formulario para añadir nueva municipio */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Añadir Municipio
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Id:</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Id Departamento:</label>
              <input
                type="text"
                name="id_departamento"
                value={formData.id_departamento}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md w-full"
            >
              Añadir
            </button>
          </form>
        </div>

        {/* Tabla de Municipios */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Id departamento</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {municipios.map((municipio) => (
              <tr key={municipio.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{municipio.id || "sin ID"}</td>
                <td className="px-4 py-2">{municipio.nombre}</td>
                <td className="px-4 py-2">{municipio.id_departamento}</td>

                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/municipio/${municipio.id}`}
                    className="bg-teal-700 text-white py-1 px-4 rounded-md hover:bg-teal-800 transition"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => handleEliminar(municipio.id)}
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

export default MunicipiosPage;
