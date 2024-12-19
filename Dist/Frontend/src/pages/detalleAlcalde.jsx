"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const DetalleAlcaldePage = () => {
    const { id } = (0, react_router_dom_1.useParams)(); // Obtenemos el id de la URL
    const [alcalde, setAlcalde] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true); // Control de estado de carga
    const [error, setError] = (0, react_1.useState)(null); // Manejo de errores
    (0, react_1.useEffect)(() => {
        const fetchAlcalde = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Asegúrate de que la URL es correcta para obtener el alcalde usando `id_persona`
                const response = yield fetch(`https://classmatch-backend.onrender.com//api/alcalde/${id}`);
                if (!response.ok) {
                    throw new Error("No se pudo cargar la información del alcalde.");
                }
                const data = yield response.json();
                // Verifica si la respuesta contiene los datos que esperas
                if (data.data) {
                    setAlcalde(data.data); // Se guarda el alcalde si está presente en los datos
                }
                else {
                    setError("No se encontraron detalles para este alcalde.");
                }
            }
            catch (error) {
                setError("Error al obtener los datos del alcalde.");
                console.error("Error fetching alcalde:", error);
            }
            finally {
                setLoading(false); // Finaliza el estado de carga
            }
        });
        fetchAlcalde();
    }, [id]);
    // Mostrar mensaje de carga
    if (loading) {
        return <div className="text-center text-lg mt-8">Cargando...</div>;
    }
    // Mostrar mensaje de error si no se pudo cargar los datos
    if (error) {
        return <div className="text-center text-lg mt-8 text-red-600">{error}</div>;
    }
    // Si no hay datos, es posible que el id no haya sido encontrado
    if (!alcalde) {
        return <div className="text-center text-lg mt-8">Alcalde no encontrado</div>;
    }
    return (<div className="flex justify-center">
      <div className="flex flex-col items-center justify-center w-3/4">
        <div className="bg-neutral-100 shadow-lg rounded-lg p-6 w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Detalle de Alcalde
          </h1>
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-600">ID de Persona:</span>{" "}
              <span className="text-gray-800">{alcalde.id_persona}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">ID de Municipio:</span>{" "}
              <span className="text-gray-800">{alcalde.id_municipio}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Fecha de Registro:</span>{" "}
              <span className="text-gray-800">{alcalde.fecha_registro}</span>
            </div>
          </div>
          <button className="mt-6 bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-lg w-full" onClick={() => window.history.back()}>
            Volver
          </button>
        </div>
      </div>
    </div>);
};
exports.default = DetalleAlcaldePage;
