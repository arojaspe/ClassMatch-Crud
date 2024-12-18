import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Vivienda } from "../types";

const DetalleViviendaPage = () => {
  const { id } = useParams();
  const [vivienda, setVivienda] = useState<Vivienda>();

  useEffect(() => {
    const fetchVivienda = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/vivienda/${id}`
        );
        const data = await response.json();
        setVivienda(data.data); // Asegurarse de acceder al campo "data"
        console.log(data.data); // Verifica los datos en la consola
      } catch (error) {
        console.error("Error fetching vivienda:", error);
      }
    };

    fetchVivienda();
  }, [id]);

  if (!vivienda)
    return <div className="text-center text-lg mt-8">Cargando...</div>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-3/4">
        <div className="bg-neutral-100 shadow-lg rounded-lg p-6 w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Detalle de Vivienda
          </h1>
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-600">Dirección:</span>{" "}
              <span className="text-gray-800">{vivienda.direccion}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Tipo de vivienda:
              </span>{" "}
              <span className="text-gray-800">{vivienda.categoria}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Capacidad (personas):
              </span>{" "}
              <span className="text-gray-800">{vivienda.capacidad}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Área:</span>{" "}
              <span className="text-gray-800">{vivienda.area}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Estrato:</span>{" "}
              <span className="text-gray-800">{vivienda.estrato}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                ID de municipio:
              </span>{" "}
              <span className="text-gray-800">{vivienda.id_municipio}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Cantidad de pisos:
              </span>{" "}
              <span className="text-gray-800">{vivienda.niveles}</span>
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

export default DetalleViviendaPage;
