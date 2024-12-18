import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Persona } from "../types";

const DetallePersonaPage = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState<Persona>();

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/persona/${id}`);
        const data = await response.json();
        setPersona(data.data); // Asegurarse de acceder al campo "data"
        console.log(data.data); // Verifica los datos en la consola
      } catch (error) {
        console.error("Error fetching persona:", error);
      }
    };

    fetchPersona();
  }, [id]);

  if (!persona)
    return <div className="text-center text-lg mt-10">Cargando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-indigo-100 shadow-lg rounded-lg p-6 w-auto w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Detalle de Persona
        </h1>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-600">Nombre:</span>{" "}
            <span className="text-gray-800">{persona.nombre}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">
              Tipo de Documento:
            </span>{" "}
            <span className="text-gray-800">{persona.tipo_doc}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">
              Fecha de Nacimiento:
            </span>{" "}
            <span className="text-gray-800">{persona.fecha_nac}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Sexo:</span>{" "}
            <span className="text-gray-800">{persona.sexo}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Teléfono:</span>{" "}
            <span className="text-gray-800">
              {persona.telefono || "No disponible"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">
              ID de Vivienda Actual:
            </span>{" "}
            <span className="text-gray-800">{persona.id_vivienda_actual}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">
              ID de Municipio de Origen:
            </span>{" "}
            <span className="text-gray-800">{persona.id_municipio_origen}</span>
          </div>
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
          onClick={() => window.history.back()}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetallePersonaPage;
