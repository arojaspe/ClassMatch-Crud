// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Vivienda } from "../types";

const DetalleViviendaPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vivienda, setVivienda] = useState<Vivienda | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Vivienda>({
    direccion: "",
    categoria: "",
    capacidad: 0,
    area: 0,
    estrato: 0,
    id_municipio: "",
    niveles: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // Cargar los datos de la vivienda
  useEffect(() => {
    const fetchVivienda = async () => {
      try {
        const response = await fetch(`https://classmatch-crud-backend.onrender.com/api/vivienda/${id}`);
        const data = await response.json();
        setVivienda(data.data);
        setFormData(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching vivienda:", error);
      }
    };

    fetchVivienda();
  }, [id]);

  // Manejador de cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Para validar los campos numéricos (capacidad, área, estrato, id_municipio)
    if (
      name === "capacidad" ||
      name === "area" ||
      name === "estrato" ||
      name === "id_municipio"
    ) {
      const parsedValue = parseInt(value, 10);
      if (parsedValue < 0) {
        setError("Los valores numéricos no pueden ser negativos.");
        return;
      } else {
        setError(null); // Limpiar error si el valor es válido
      }
  
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
  

  // Guardar los cambios en la vivienda
  const handleSave = () => {
    if (!formData.direccion || !formData.categoria || !formData.id_municipio) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Enviar los cambios al backend
    axios
      .put(`https://classmatch-crud-backend.onrender.com/api/vivienda/${id}`, formData)
      .then((response) => {
        setVivienda(response.data.vivienda);
        setIsEditing(false);
        setError(null); // Limpiar errores
        window.location.reload();
        console.log("FLAG")
      })
      .catch((error) => {
        console.error("Error saving vivienda:", error);
      });
  };

  // Cancelar cambios y restaurar datos originales
  const handleCancel = () => {
    setFormData(vivienda!); // Restaurar datos originales
    setIsEditing(false);
    setError(null); // Limpiar errores
  };

  if (!vivienda)
    return <div className="text-center text-lg mt-8">Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Detalle de Vivienda
        </h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md mb-4"
        >
          Volver
        </button>

        <form className="space-y-4">
          {/* Dirección */}
          <div>
            <label className="block text-gray-700">Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={true} // Campo solo lectura
            />
          </div>

          {/* Tipo de Vivienda */}
          <div>
            <label className="block text-gray-700">Tipo de Vivienda:</label>
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={true} // Campo solo lectura
            />
          </div>

          {/* Capacidad */}
          <div>
            <label className="block text-gray-700">Capacidad (personas):</label>
            <input
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing} // Editable solo en modo edición
            />
          </div>

          {/* Área */}
          <div>
            <label className="block text-gray-700">Área:</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing} // Editable solo en modo edición
            />
          </div>

          {/* Estrato */}
          <div>
            <label className="block text-gray-700">Estrato:</label>
            <input
              type="number"
              name="estrato"
              value={formData.estrato}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing} // Editable solo en modo edición
            />
          </div>

          {/* ID de Municipio */}
          <div>
            <label className="block text-gray-700">ID de Municipio:</label>
            <input
              type="text"
              name="id_municipio"
              value={formData.id_municipio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={true} // Campo solo lectura
            />
          </div>

          {/* Cantidad de Pisos */}
          <div>
            <label className="block text-gray-700">Cantidad de Pisos:</label>
            <input
              type="number"
              name="niveles"
              value={formData.niveles}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={true} // Campo solo lectura
            />
          </div>

          {/* Botones de edición */}
          <div className="mt-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
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

export default DetalleViviendaPage;
