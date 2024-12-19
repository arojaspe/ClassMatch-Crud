// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gobernador } from "../types";

const DetalleGobernadorPage = () => {
  const { id } = useParams();
  const [gobernador, setGobernador] = useState<Gobernador>();

  useEffect(() => {
    const fetchGobernador = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/gobernador/${id}`
        );
        const data = await response.json();
        setGobernador(data.data); // Asegurarse de acceder al campo "data"
        console.log(data.data); // Verifica los datos en la consola
      } catch (error) {
        console.error("Error fetching gobernador:", error);
      }
    };

    fetchGobernador();
  }, [id]);

  if (!gobernador)
    return <div className="text-center text-lg mt-8">Cargando...</div>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-3/4">
        <div className="bg-neutral-100 shadow-lg rounded-lg p-6 w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Detalle de Gobernador
          </h1>
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-600">Nombre:</span>{" "}
              <span className="text-gray-800">{gobernador.persona.nombre}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Fecha de inicio de labores:
              </span>{" "}
              <span className="text-gray-800">{gobernador.fecha_registro}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Gobernador de:
              </span>{" "}
              <span className="text-gray-800">
                {gobernador.persona.municipio.departamento.nombre}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Ciudad de residencia:
              </span>{" "}
              <span className="text-gray-800">
                {gobernador.persona.municipio.nombre}
              </span>
            </div>
          </div>
          <button
            className="mt-6 bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-lg w-full"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleGobernadorPage;
