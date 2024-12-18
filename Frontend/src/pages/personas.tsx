import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Persona } from "../types";

const PersonasPage: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo_doc: "",
    numero_doc: "",
    sexo: "",
    fecha_nac: "",
    telefono: "",
    id_vivienda_actual: "",
    id_municipio_origen: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/personas")
      .then((response) => {
        setPersonas(response.data.personas);
      })
      .catch((error) => {
        console.error("Error fetching personas:", error);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.tipo_doc ||
      !formData.numero_doc ||
      !formData.sexo ||
      !formData.fecha_nac ||
      !formData.telefono ||
      !formData.id_vivienda_actual ||
      !formData.id_municipio_origen
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    axios
      .post("http://localhost:5000/api/personas", formData)
      .then((response) => {
        setPersonas([...personas, response.data.persona]); // Añadimos la nueva persona al estado
        setFormData({
          nombre: "",
          tipo_doc: "",
          numero_doc: "",
          sexo: "",
          fecha_nac: "",
          telefono: "",
          id_vivienda_actual: "",
          id_municipio_origen: "",
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error adding persona:", error);
      });
  };

  // Función para manejar la eliminación de una persona
  const handleEliminar = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/persona/${id}`)
      .then(() => {
        // Actualizamos el estado eliminando la persona del array
        setPersonas(personas.filter((persona) => persona.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting persona:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Personas</h1>

        {/* Formulario para añadir nueva persona */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">Añadir Persona</h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-gray-700">Tipo de Documento:</label>
              <input
                type="text"
                name="tipo_doc"
                value={formData.tipo_doc}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Número de Documento:</label>
              <input
                type="text"
                name="numero_doc"
                value={formData.numero_doc}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Sexo:</label>
              <input
                type="text"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fecha_nac"
                value={formData.fecha_nac}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">ID de Vivienda Actual:</label>
              <input
                type="text"
                name="id_vivienda_actual"
                value={formData.id_vivienda_actual}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">ID de Municipio de Origen:</label>
              <input
                type="text"
                name="id_municipio_origen"
                value={formData.id_municipio_origen}
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

        {/* Tabla de Personas */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Tipo de Documento</th>
              <th className="px-4 py-2 text-left">Sexo</th>
              <th className="px-4 py-2 text-left">Fecha de Nacimiento</th>
              <th className="px-4 py-2 text-left"></th>
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
                  <Link
                    to={`/persona/${persona.id}`}
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition"
                  >
                    Ver Detalles
                  </Link>
                  <button
                    onClick={() => handleEliminar(persona.id)} // Llama a la función de eliminación
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

export default PersonasPage;
