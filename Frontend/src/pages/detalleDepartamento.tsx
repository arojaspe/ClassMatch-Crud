// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetalleDepartamentoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la departamento
  const navigate = useNavigate(); // Para redirigir después de guardar/cancelar
  const [departamento, setDepartamento] = useState<any>(null); // Datos de la departamento
  const [isEditing, setIsEditing] = useState(false); // Para determinar si estamos en modo edición
  const [formData, setFormData] = useState<any>({
    nombre: "",
    pais: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Cargar los datos de la departamento
  useEffect(() => {
    const fetchDepartamento = async () => {
      try {
        const response = await fetch(
          `https://classmatch-crud-backend.onrender.com/api/departamento/${id}`
        );
        const data = await response.json();
        setDepartamento(data.data); // Asegurarse de acceder al campo "data"
        setFormData(data.data); // Inicializar el formulario con los datos de la departamento
        console.log(data.data); // Verifica los datos en la consola
      } catch (error) {
        console.error("Error fetching departamento:", error);
      }
    };
    fetchDepartamento();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validación para teléfono e ID de vivienda actual
    if (name === "telefono" || name === "id_vivienda_actual") {
      // Convertimos el valor a número
      const parsedValue = parseInt(value, 10);

      // Si el valor es menor que 0, no lo actualizamos
      if (parsedValue < 0) {
        setError("Los valores de teléfono e IDs no pueden ser negativos.");
        return;
      } else {
        setError(null); // Limpiamos el error si el valor es válido
      }

      // Actualizamos el valor en el estado
      setFormData({
        ...formData,
        [name]: parsedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    // Validación antes de guardar
    if (!formData.nombre || !formData.pais || !formData.id_vivienda_actual) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Enviar los cambios al backend
    axios
      .put(`https://classmatch-crud-backend.onrender.com/api/departamento/${id}`, formData)
      .then((response) => {
        setDepartamento(response.data.departamento);
        setIsEditing(false); // Cambiar a modo de solo lectura
        setError(null); // Limpiar errores
      })
      .catch((error) => {
        console.error("Error saving departamento:", error);
      });
  };

  const handleCancel = () => {
    setFormData(departamento); // Restauramos los datos originales
    setIsEditing(false); // Salimos del modo edición
    setError(null); // Limpiar errores
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Detalle de Departamento
        </h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Botón de Volver */}
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 hover:bg-blue-600 text-white py-2 px-6 rounded-md mb-4"
        >
          Volver
        </button>

        <form className="space-y-4">
          {/* Mostrar los datos de la departamento en campos de solo lectura */}
          <div>
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing} // Deshabilitamos si no estamos en modo edición
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
              disabled={true}
            />
          </div>

          {/* Mostrar los botones dependiendo del estado de edición */}
          <div className="mt-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)} // Cambiar a modo edición
                className="bg-teal-600 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
              >
                Editar
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md mr-4"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetalleDepartamentoPage;
