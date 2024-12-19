"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const personas_1 = __importDefault(require("./pages/personas"));
const detallePersona_1 = __importDefault(require("./pages/detallePersona"));
const viviendas_1 = __importDefault(require("./pages/viviendas"));
const Header_1 = __importDefault(require("./components/Header"));
const detalleVivienda_1 = __importDefault(require("./pages/detalleVivienda"));
const gobernadores_1 = __importDefault(require("./pages/gobernadores"));
const detalleGobernador_1 = __importDefault(require("./pages/detalleGobernador"));
const alcaldes_1 = __importDefault(require("./pages/alcaldes"));
const detalleAlcalde_1 = __importDefault(require("./pages/detalleAlcalde"));
const detalleDepartamento_1 = __importDefault(require("./pages/detalleDepartamento"));
const municipios_1 = __importDefault(require("./pages/municipios"));
const detalleMunicipio_1 = __importDefault(require("./pages/detalleMunicipio"));
const departamentos_1 = __importDefault(require("./pages/departamentos"));
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <div className="bg-white min-h-screen">
        {/* Header agregado al inicio */}
        <Header_1.default />

        {/* Contenido Principal */}
        <main className="px-4 py-6">
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/personas" element={<personas_1.default />}/>
            <react_router_dom_1.Route path="/persona/:id" element={<detallePersona_1.default />}/>
            <react_router_dom_1.Route path="/viviendas" element={<viviendas_1.default />}/>
            <react_router_dom_1.Route path="/vivienda/:id" element={<detalleVivienda_1.default />}/>
            <react_router_dom_1.Route path="/gobernadores" element={<gobernadores_1.default />}/>
            <react_router_dom_1.Route path="/gobernador/:id" element={<detalleGobernador_1.default />}/>
            <react_router_dom_1.Route path="/alcaldes" element={<alcaldes_1.default />}/>
            <react_router_dom_1.Route path="/alcalde/:id" element={<detalleAlcalde_1.default />}/>
            <react_router_dom_1.Route path="/departamentos" element={<departamentos_1.default />}/>
            <react_router_dom_1.Route path="/departamento/:id" element={<detalleDepartamento_1.default />}/>
            <react_router_dom_1.Route path="/municipios" element={<municipios_1.default />}/>
            <react_router_dom_1.Route path="/municipio/:id" element={<detalleMunicipio_1.default />}/>
          </react_router_dom_1.Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>ClassMatch CRUD</p>
        </footer>
      </div>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
