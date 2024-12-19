"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const AlcaldesPage = () => {
    const [alcaldes, setAlcaldes] = (0, react_1.useState)([]);
    const [formData, setFormData] = (0, react_1.useState)({
        id_persona: 0,
        id_municipio: 0,
        fecha_registro: "",
    });
    const [error, setError] = (0, react_1.useState)(null);
    // Cargar los datos de los alcaldes
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:5000/api/alcaldes")
            .then((response) => {
            setAlcaldes(response.data.alcaldes);
        })
            .catch((error) => {
            console.error("Error fetching alcaldes:", error);
            window.location.reload();
        });
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar campos
        if (!formData.id_persona || !formData.id_municipio || !formData.fecha_registro) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        // Validar valores negativos para id_persona e id_municipio
        if (formData.id_persona < 0 || formData.id_municipio < 0) {
            setError("Los valores de ID no pueden ser negativos.");
            return;
        }
        // Preparar los datos en el formato correcto para el backend
        const alcaldeData = {
            id_persona: formData.id_persona,
            id_municipio: formData.id_municipio,
            fecha_registro: formData.fecha_registro,
        };
        axios_1.default
            .post("http://localhost:5000/api/alcalde", alcaldeData)
            .then((response) => {
            setAlcaldes([...alcaldes, response.data.alcalde]); // Añadimos el nuevo alcalde al estado
            setFormData({
                id_persona: 0,
                id_municipio: 0,
                fecha_registro: "",
            }); // Limpiar el formulario
            setError(null); // Limpiar errores
            window.location.reload();
        })
            .catch((error) => {
            console.error("Error adding alcalde:", error);
        });
    };
    return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Alcaldes</h1>

        {/* Formulario para añadir nuevo alcalde */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Añadir Alcalde
          </h2>

          {error && (<div className="text-red-500 text-center mb-4">{error}</div>)}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">ID de Persona:</label>
              <input type="number" name="id_persona" value={formData.id_persona} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required min="0"/>
            </div>

            <div>
              <label className="block text-gray-700">ID de Municipio:</label>
              <input type="number" name="id_municipio" value={formData.id_municipio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required min="0"/>
            </div>

            <div>
              <label className="block text-gray-700">Fecha de Registro:</label>
              <input type="date" name="fecha_registro" value={formData.fecha_registro} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required/>
            </div>

            <button type="submit" // Cambiamos a "submit" para que funcione correctamente con el formulario
     className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md w-full">
              Añadir
            </button>
          </form>
        </div>

        {/* Tabla de Alcaldes sin la columna ID */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-2 text-left">ID de Persona</th>
              <th className="px-4 py-2 text-left">ID de Municipio</th>
              <th className="px-4 py-2 text-left">Fecha de Registro</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {alcaldes.map((alcalde) => (<tr key={alcalde.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{alcalde.id_persona}</td>
                <td className="px-4 py-2">{alcalde.id_municipio}</td>
                <td className="px-4 py-2">{alcalde.fecha_registro}</td>
                <td className="px-4 py-2 text-center">
                  <react_router_dom_1.Link to={`/alcalde/${alcalde.id_persona}`} className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition">
                    Ver Detalles
                  </react_router_dom_1.Link>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.default = AlcaldesPage;
