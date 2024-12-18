"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const personas_1 = __importDefault(require("./pages/personas"));
const detallePersona_1 = __importDefault(require("./pages/detallePersona"));
const viviendas_1 = __importDefault(require("./pages/viviendas"));
const Header_1 = __importDefault(require("./components/Header"));
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
