"use strict";
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
const DetallePersonaPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [persona, setPersona] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const fetchPersona = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:5000/api/persona/${id}`);
                const data = yield response.json();
                setPersona(data.data); // Asegurarse de acceder al campo "data"
                console.log(data.data); // Verifica los datos en la consola
            }
            catch (error) {
                console.error("Error fetching persona:", error);
            }
        });
        fetchPersona();
    }, [id]);
    if (!persona)
        return <div className="text-center text-lg mt-10">Cargando...</div>;
    return (<div className="flex flex-col items-center justify-center min-h-screen">
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
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full" onClick={() => window.history.back()}>
          Volver
        </button>
      </div>
    </div>);
};
exports.default = DetallePersonaPage;
