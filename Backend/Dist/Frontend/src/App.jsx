"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const personas_1 = __importDefault(require("./pages/personas"));
const detallePersona_1 = __importDefault(require("./pages/detallePersona"));
function App() {
    return (<>
      <div className="bg-white">
        <react_router_dom_1.BrowserRouter>
          <header className="bg-blue-600 text-white py-4 shadow-md">
            <h1 className="text-center text-2xl font-bold">
              Gestión de Personas
            </h1>
          </header>
          <main className="flex-grow px-4 py-6">
            <react_router_dom_1.Routes>
              <react_router_dom_1.Route path="/personas" element={<personas_1.default />}/>
              <react_router_dom_1.Route path="/persona/:id" element={<detallePersona_1.default />}/>
            </react_router_dom_1.Routes>
          </main>
          <footer className="bg-gray-800 text-white py-4 text-center">
            <p>&copy; {new Date().getFullYear()} Mi Aplicación</p>
          </footer>
        </react_router_dom_1.BrowserRouter>
      </div>
    </>);
}
exports.default = App;
