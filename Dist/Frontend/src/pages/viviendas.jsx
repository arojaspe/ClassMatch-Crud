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
const react_router_dom_1 = require("react-router-dom"); // Importamos Link para la navegación
const ViviendasPage = () => {
    const [viviendas, setViviendas] = (0, react_1.useState)([]); // Estado para las viviendas
    const [formData, setFormData] = (0, react_1.useState)({
        direccion: "",
        id_municipio: "",
        capacidad: "",
        niveles: "",
        area: "",
        categoria: "",
        estrato: "",
    });
    const [error, setError] = (0, react_1.useState)(null); // Estado para manejar errores
    // Cargar las viviendas desde el backend
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:5000/api/viviendas")
            .then((response) => {
            setViviendas(response.data.viviendas);
            console.log(response.data);
        })
            .catch((error) => {
            console.error("Error fetching viviendas:", error);
        });
    }, []);
    const handleEliminar = (id) => {
        axios_1.default
            .delete(`http://localhost:5000/api/vivienda/${id}`)
            .then(() => {
            setViviendas(viviendas.filter((vivienda) => vivienda.id !== id));
        })
            .catch((error) => {
            console.error("Error deleting vivienda:", error);
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Asegurarse de que los valores numéricos no sean negativos
        if (name === "id_municipio" || name === "capacidad" || name === "niveles" || name === "area" || name === "estrato") {
            if (parseInt(value) < 0) {
                return; // Evitar que se ingrese un valor negativo
            }
        }
        setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple antes de enviar
        if (!formData.direccion ||
            !formData.id_municipio ||
            !formData.capacidad ||
            !formData.niveles ||
            !formData.area ||
            !formData.categoria ||
            !formData.estrato) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        // Enviar los datos al backend
        axios_1.default
            .post("http://localhost:5000/api/vivienda", formData)
            .then((response) => {
            setViviendas([...viviendas, response.data.vivienda]); // Agregar la nueva vivienda a la lista
            setFormData({
                direccion: "",
                id_municipio: "",
                capacidad: "",
                niveles: "",
                area: "",
                categoria: "",
                estrato: "",
            }); // Limpiar el formulario
            setError(null); // Limpiar errores
            window.location.reload();
        })
            .catch((error) => {
            console.error("Error adding vivienda:", error);
        });
    };
    return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Viviendas</h1>

        {/* Formulario para agregar una nueva vivienda */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div>
            <label className="block text-gray-700">Dirección:</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-gray-700">ID de Municipio:</label>
            <input type="number" name="id_municipio" value={formData.id_municipio} onChange={handleChange} min="0" // Previene números negativos
     className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-gray-700">Capacidad:</label>
            <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} min="0" // Previene números negativos
     className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-gray-700">Niveles:</label>
            <input type="number" name="niveles" value={formData.niveles} onChange={handleChange} min="0" // Previene números negativos
     className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-gray-700">Área:</label>
            <input type="number" name="area" value={formData.area} onChange={handleChange} min="0" // Previene números negativos
     className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-gray-700">Categoría:</label>
            <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div>
            <label className="block text-gray-700">Estrato:</label>
            <input type="number" name="estrato" value={formData.estrato} onChange={handleChange} min="0" // Previene números negativos
     className="w-full p-2 border border-gray-300 rounded-md"/>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-teal-700 text-white py-2 px-6 rounded-md hover:bg-teal-800 transition">
              Agregar Vivienda
            </button>
          </div>
        </form>

        {/* Tabla de viviendas */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Tipo de vivienda</th>
              <th className="px-4 py-2 text-left">Estrato</th>
              <th className="px-4 py-2 text-left">Área</th>
              <th className="px-4 py-2 text-left">Capacidad</th>
              <th className="px-4 py-2 text-left"></th> {/* Nueva columna */}
            </tr>
          </thead>
          <tbody>
            {viviendas.map((vivienda) => (<tr key={vivienda.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{vivienda.id}</td>
                <td className="px-4 py-2">{vivienda.direccion}</td>
                <td className="px-4 py-2">{vivienda.categoria}</td>
                <td className="px-4 py-2">{vivienda.estrato}</td>
                <td className="px-4 py-2">{vivienda.area}</td>
                <td className="px-4 py-2">{vivienda.capacidad}</td>
                <td className="px-4 py-2 flex text-center">
                  {/* Botón de detalle que usa Link para redirigir */}
                  <react_router_dom_1.Link to={`/vivienda/${vivienda.id}`} className="bg-teal-700 text-white py-1 px-4 rounded-md hover:bg-teal-800 transition">
                    Ver Detalles
                  </react_router_dom_1.Link>
                  <button onClick={() => handleEliminar(vivienda.id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition ml-4">
                    Eliminar
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.default = ViviendasPage;
