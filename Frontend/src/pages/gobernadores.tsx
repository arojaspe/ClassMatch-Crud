import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Gobernador } from "../types";

const GobernadoresPage: React.FC = () => {
  const [gobernadores, setGobernadores] = useState<Gobernador[]>([]);
  const [formData, setFormData] = useState({
    id_persona: "",
    id_departamento: "",
    fecha_registro: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gobernadores")
      .then((response) => {
        setGobernadores(response.data.gobernadores);
      })
      .catch((error) => {
        console.error("Error fetching gobernadores:", error);
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
    if (
      !formData.id_persona ||
      !formData.id_departamento ||
      !formData.fecha_registro
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Validar valores negativos para teléfono e ID

    // Preparar los datos en el formato correcto para el backend
    const gobernadorData = {
      id_persona: formData.id_persona,
      id_departamento: formData.id_departamento,
      fecha_registro: formData.fecha_registro, // La fecha ya debería estar en formato adecuado
    };

    axios
      .post("http://localhost:5000/api/gobernador", gobernadorData)
      .then((response) => {
        setGobernadores([...gobernadores, response.data.gobernador]); // Añadimos la nueva gobernador al estado
        setFormData({
          id_persona: "",
          id_departamento: "",
          fecha_registro: "",
        }); // Limpiar el formulario
        setError(null); // Limpiar errores
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding gobernador:", error);
      });
  };

  // Función para manejar la eliminación de una gobernador
  // const handleEliminar = (id: number) => {
  //   axios
  //     .delete(`http://localhost:5000/api/gobernador/${id}`)
  //     .then(() => {
  //       // Actualizamos el estado eliminando la gobernador del array
  //       setGobernadores(
  //         gobernadores.filter((gobernador) => gobernador.id !== id)
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting gobernador:", error);
  //     });
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Gobernadores
        </h1>

        {/* Formulario para añadir nueva gobernador */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Añadir Persona
          </h2>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Id persona:</label>
              <input
                type="number"
                name="id_persona"
                value={formData.id_persona}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">id_departamento:</label>
              <input
                type="number"
                name="id_departamento"
                value={formData.id_departamento}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Fecha de inicio de periodo:
              </label>
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

        {/* Tabla de Gobernadores */}
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
