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
const PersonasPage = () => {
    const [personas, setPersonas] = (0, react_1.useState)([]);
    const [formData, setFormData] = (0, react_1.useState)({
        nombre: "",
        tipo_doc: "",
        numero_doc: "",
        sexo: "",
        fecha_nac: "",
        telefono: 0,
        id_vivienda_actual: 0,
        id_municipio_origen: 0,
    });
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        axios_1.default
            .get("http://localhost:5000/api/personas")
            .then((response) => {
            setPersonas(response.data.personas);
        })
            .catch((error) => {
            console.error("Error fetching personas:", error);
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
        if (!formData.nombre ||
            !formData.tipo_doc ||
            !formData.sexo ||
            !formData.fecha_nac ||
            !formData.telefono ||
            !formData.id_vivienda_actual ||
            !formData.id_municipio_origen) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        // Validar valores negativos para teléfono e ID
        if (formData.telefono < 0 ||
            formData.id_vivienda_actual < 0 ||
            formData.id_municipio_origen < 0) {
            setError("Los valores de teléfono e IDs no pueden ser negativos.");
            return;
        }
        // Preparar los datos en el formato correcto para el backend
        const personaData = {
            tipo_doc: formData.tipo_doc,
            nombre: formData.nombre,
            fecha_nac: formData.fecha_nac,
            sexo: formData.sexo,
            telefono: formData.telefono,
            id_vivienda_actual: formData.id_vivienda_actual,
            id_municipio_origen: formData.id_municipio_origen,
        };
        axios_1.default
            .post("http://localhost:5000/api/persona", personaData)
            .then((response) => {
            setPersonas([...personas, response.data.persona]); // Añadimos la nueva persona al estado
            setFormData({
                nombre: "",
                tipo_doc: "",
                numero_doc: "",
                sexo: "",
                fecha_nac: "",
                telefono: 0,
                id_vivienda_actual: 0,
                id_municipio_origen: 0,
            }); // Limpiar el formulario
            setError(null); // Limpiar errores
            window.location.reload();
        })
            .catch((error) => {
            console.error("Error adding persona:", error);
        });
    };
    // Función para manejar la eliminación de una persona
    const handleEliminar = (id) => {
        axios_1.default
            .delete(`http://localhost:5000/api/persona/${id}`)
            .then(() => {
            // Actualizamos el estado eliminando la persona del array
            setPersonas(personas.filter((persona) => persona.id !== id));
        })
            .catch((error) => {
            console.error("Error deleting persona:", error);
        });
    };
    return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">Personas</h1>

        {/* Formulario para añadir nueva persona */}
        <div className="bg-gray-200 p-4 mb-6 rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Añadir Persona
          </h2>

          {error && (<div className="text-red-500 text-center mb-4">{error}</div>)}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
              <label className="block text-gray-700">Tipo de Documento:</label>
              <select name="tipo_doc" value={formData.tipo_doc} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required>
                <option value="">Seleccionar</option>
                <option value="Cédula">Cédula</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Sexo:</label>
              <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required>
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">
                Fecha de Nacimiento:
              </label>
              <input type="date" name="fecha_nac" value={formData.fecha_nac} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required/>
            </div>
            <div>
              <label className="block text-gray-700">Teléfono:</label>
              <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required min="0"/>
            </div>
            <div>
              <label className="block text-gray-700">
                ID de Vivienda Actual:
              </label>
              <input type="number" name="id_vivienda_actual" value={formData.id_vivienda_actual} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required min="0"/>
            </div>
            <div>
              <label className="block text-gray-700">
                ID de Municipio de Origen:
              </label>
              <input type="number" name="id_municipio_origen" value={formData.id_municipio_origen} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required min="0"/>
            </div>

            <button type="submit" // Cambiamos a "submit" para que funcione correctamente con el formulario
     className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md w-full">
              Añadir
            </button>
          </form>
        </div>

        {/* Tabla de Personas */}
        <table className="min-w-full bg-white table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-800 text-white">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Tipo de Documento</th>
              <th className="px-4 py-2 text-left">Sexo</th>
              <th className="px-4 py-2 text-left">Fecha de Nacimiento</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) => (<tr key={persona.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{persona.id || "sin ID"}</td>
                <td className="px-4 py-2">{persona.nombre}</td>
                <td className="px-4 py-2">{persona.tipo_doc}</td>
                <td className="px-4 py-2">{persona.sexo}</td>
                <td className="px-4 py-2">{persona.fecha_nac}</td>
                <td className="px-4 py-2 text-center">
                  <react_router_dom_1.Link to={`/persona/${persona.id}`} className="bg-teal-600 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition">
                    Ver Detalles
                  </react_router_dom_1.Link>
                  <button onClick={() => handleEliminar(persona.id)} className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition ml-4">
                    Eliminar
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
};
exports.default = PersonasPage;
