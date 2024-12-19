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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const DetallePersona = () => {
    const { id } = (0, react_router_dom_1.useParams)(); // Obtener el ID de la persona
    const navigate = (0, react_router_dom_1.useNavigate)(); // Para redirigir después de guardar/cancelar
    const [persona, setPersona] = (0, react_1.useState)(null); // Datos de la persona
    const [isEditing, setIsEditing] = (0, react_1.useState)(false); // Para determinar si estamos en modo edición
    const [formData, setFormData] = (0, react_1.useState)({
        nombre: "",
        tipo_doc: "",
        numero_doc: "",
        sexo: "",
        fecha_nac: "",
        telefono: "",
        id_vivienda_actual: "",
        id_municipio_origen: "",
    });
    const [error, setError] = (0, react_1.useState)(null);
    // Cargar los datos de la persona
    (0, react_1.useEffect)(() => {
        const fetchPersona = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://classmatch-backend.onrender.com//api/persona/${id}`);
                const data = yield response.json();
                setPersona(data.data); // Asegurarse de acceder al campo "data"
                setFormData(data.data); // Inicializar el formulario con los datos de la persona
                console.log(data.data); // Verifica los datos en la consola
            }
            catch (error) {
                console.error("Error fetching persona:", error);
            }
        });
        fetchPersona();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validación para teléfono e ID de vivienda actual
        if (name === "telefono" || name === "id_vivienda_actual") {
            // Convertimos el valor a número
            const parsedValue = parseInt(value, 10);
            // Si el valor es menor que 0, no lo actualizamos
            if (parsedValue < 0) {
                setError("Los valores de teléfono e IDs no pueden ser negativos.");
                return;
            }
            else {
                setError(null); // Limpiamos el error si el valor es válido
            }
            // Actualizamos el valor en el estado
            setFormData(Object.assign(Object.assign({}, formData), { [name]: parsedValue }));
        }
        else {
            setFormData(Object.assign(Object.assign({}, formData), { [name]: value }));
        }
    };
    const handleSave = () => {
        // Validación antes de guardar
        if (!formData.nombre ||
            !formData.telefono ||
            !formData.id_vivienda_actual) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        // Enviar los cambios al backend
        axios_1.default
            .put(`https://classmatch-backend.onrender.com//api/persona/${id}`, formData)
            .then((response) => {
            setPersona(response.data.persona);
            setIsEditing(false); // Cambiar a modo de solo lectura
            setError(null); // Limpiar errores
        })
            .catch((error) => {
            console.error("Error saving persona:", error);
        });
    };
    const handleCancel = () => {
        setFormData(persona); // Restauramos los datos originales
        setIsEditing(false); // Salimos del modo edición
        setError(null); // Limpiar errores
    };
    return (<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Detalle de Persona
        </h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Botón de Volver */}
        <button onClick={() => navigate(-1)} className="bg-teal-600 hover:bg-blue-600 text-white py-2 px-6 rounded-md mb-4">
          Volver
        </button>

        <form className="space-y-4">
          {/* Mostrar los datos de la persona en campos de solo lectura */}
          <div>
            <label className="block text-gray-700">Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={!isEditing} // Deshabilitamos si no estamos en modo edición
    />
          </div>

          <div>
            <label className="block text-gray-700">Tipo de Documento:</label>
            <input type="text" name="tipo_doc" value={formData.tipo_doc} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={true}/>
          </div>

          <div>
            <label className="block text-gray-700">Sexo:</label>
            <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={true}/>
          </div>

          <div>
            <label className="block text-gray-700">Fecha de Nacimiento:</label>
            <input type="date" name="fecha_nac" value={formData.fecha_nac} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={true}/>
          </div>

          <div>
            <label className="block text-gray-700">Teléfono:</label>
            <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={!isEditing}/>
          </div>

          <div>
            <label className="block text-gray-700">
              ID de Vivienda Actual:
            </label>
            <input type="number" name="id_vivienda_actual" value={formData.id_vivienda_actual} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={!isEditing}/>
          </div>

          <div>
            <label className="block text-gray-700">
              ID de Municipio de Origen:
            </label>
            <input type="text" name="id_municipio_origen" value={formData.id_municipio_origen} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" disabled={true}/>
          </div>

          {/* Mostrar los botones dependiendo del estado de edición */}
          <div className="mt-4">
            {!isEditing ? (<button type="button" onClick={() => setIsEditing(true)} // Cambiar a modo edición
         className="bg-teal-600 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
                Editar
              </button>) : (<div>
                <button type="button" onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md mr-4">
                  Guardar
                </button>
                <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md">
                  Cancelar
                </button>
              </div>)}
          </div>
        </form>
      </div>
    </div>);
};
exports.default = DetallePersona;
