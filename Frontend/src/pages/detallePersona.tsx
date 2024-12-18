import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DetallePersona: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la persona
  const navigate = useNavigate(); // Para redirigir después de guardar/cancelar
  const [persona, setPersona] = useState<any>(null); // Datos de la persona
  const [isEditing, setIsEditing] = useState(false); // Para determinar si estamos en modo edición
  const [formData, setFormData] = useState<any>({
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

  // Cargar los datos de la persona
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/personas/${id}`)
      .then((response) => {
        setPersona(response.data.persona);
        setFormData(response.data.persona); // Inicializamos el formulario con los datos de la persona
      })
      .catch((error) => {
        console.error("Error fetching persona:", error);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Validación antes de guardar
    if (!formData.nombre || !formData.tipo_doc || !formData.numero_doc || !formData.sexo || !formData.fecha_nac || !formData.telefono || !formData.id_vivienda_actual || !formData.id_municipio_origen) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Enviar los cambios al backend
    axios
      .put(`http://localhost:5000/api/personas/${id}`, formData)
      .then((response) => {
        setPersona(response.data.persona);
        setIsEditing(false); // Cambiar a modo de solo lectura
        setError(null); // Limpiar errores
      })
      .catch((error) => {
        console.error("Error saving persona:", error);
      });
  };

  const handleCancel = () => {
    setFormData(persona); // Restauramos los datos originales
    setIsEditing(false); // Salimos del modo edición
    setError(null); // Limpiar errores
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Detalle de Persona</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Botón de Volver */}
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md mb-4"
        >
          Volver
        </button>

        <form className="space-y-4">
          {/* Mostrar los datos de la persona en campos de solo lectura */}
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
            <label className="block text-gray-700">Tipo de Documento:</label>
            <input
              type="text"
              name="tipo_doc"
              value={formData.tipo_doc}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </div>

          {/* Mostrar los botones dependiendo del estado de edición */}
          <div className="mt-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)} // Cambiar a modo edición
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
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

export default DetallePersona;
