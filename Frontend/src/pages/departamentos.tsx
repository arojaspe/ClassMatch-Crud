// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Departamento } from "../types";

const DepartamentosPage: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    pais: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://classmatch-crud-backend.onrender.com/api/departamentos")
      .then((response) => {
        setDepartamentos(response.data.departamento);
        console.log(response.data.departamento);
      })
      .catch((error) => {
        console.error("Error fetching departamentos:", error);
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
    if (!formData.nombre || !formData.pais) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Preparar los datos en el formato correcto para el backend
    const departamentoData = {
      nombre: formData.nombre,
      pais: formData.pais, // La fecha ya debería estar en formato adecuado
    };

    axios
      .post(
        `https://classmatch-crud-backend.onrender.com/api/departamento/${formData.id}`,
        departamentoData
      )
      .then((response) => {
        setDepartamentos([...departamentos, response.data.departamento]); // Añadimos la nueva departamento al estado
        setFormData({
          id: "",
          nombre: "",
          pais: "",
        }); // Limpiar el formulario
        setError(null); // Limpiar errores
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding departamento:", error);
      });
  };

  // Función para manejar la eliminación de una departamento
  const handleEliminar = (id: number) => {
    axios
      .delete(`https://classmatch-crud-backend.onrender.com/api/departamento/${id}`)
      .then(() => {
        // Actualizamos el estado eliminando la departamento del array
        setDepartamentos(
          departamentos.filter((departamento) => departamento.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting departamento:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Departamentos
        </h1>

        {/* Formulario para añadir nueva departamento */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Añadir Departamento
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
              <label className="block text-gray-700">Pais:</label>
              <input
                type="text"
                name="pais"
                value={formData.pais}
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

        {/* Tabla de Departamentos */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Pais</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((departamento) => (
              <tr key={departamento.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{departamento.id || "sin ID"}</td>
                <td className="px-4 py-2">{departamento.nombre}</td>
                <td className="px-4 py-2">{departamento.pais}</td>

                <td className="px-4 py-2 text-center">
                  <Link
                    to={`/departamento/${departamento.id}`}
                    className="bg-teal-700 text-white py-1 px-4 rounded-md hover:bg-teal-800 transition"
                  >
                    Ver
                  </Link>
                  <button
                    onClick={() => handleEliminar(departamento.id)}
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

export default DepartamentosPage;
