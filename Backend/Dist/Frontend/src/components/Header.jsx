"use strict";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
function Header() {
    return (<header className="py-5 bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <react_router_dom_1.Link to="/">
              <img src="/img/LogoText.png" alt="Logo" className="h-20 fill-white hover:opacity-25 duration-200 rounded-xl"/>
            </react_router_dom_1.Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            <react_router_dom_1.Link to="/personas" className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Personas
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/viviendas" className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Viviendas
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/gobernadores" className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Gobernadores
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/departamentos" className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Departamentos
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/municipios" className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Municipios
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/alcaldes" className="px-4 py-2 bg-white text-teal-700 rounded-md hover:bg-gray-100 transition">
              Alcaldes
            </react_router_dom_1.Link>
          </nav>
        </div>
      </div>
    </header>);
}
exports.default = Header;
