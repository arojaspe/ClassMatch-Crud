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
const DetalleGobernadorPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [gobernador, setGobernador] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const fetchGobernador = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:5000/api/gobernador/${id}`);
                const data = yield response.json();
                setGobernador(data.data); // Asegurarse de acceder al campo "data"
                console.log(data.data); // Verifica los datos en la consola
            }
            catch (error) {
                console.error("Error fetching gobernador:", error);
            }
        });
        fetchGobernador();
    }, [id]);
    if (!gobernador)
        return <div className="text-center text-lg mt-8">Cargando...</div>;
    return (<div className="flex justify-center">
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
          <button className="mt-6 bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-lg w-full" onClick={() => window.history.back()}>
            Volver
          </button>
        </div>
      </div>
    </div>);
};
exports.default = DetalleGobernadorPage;
