"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const react_router_dom_1 = require("react-router-dom");
function Header() {
    return (<header className="py-5 bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <react_router_dom_1.Link to="/">
              <img src="/img/Logo.svg" alt="Logo" className="h-8"/>
            </react_router_dom_1.Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            <react_router_dom_1.Link to="/personas" className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
              Personas
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/viviendas" className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
              Viviendas
            </react_router_dom_1.Link>
            <react_router_dom_1.Link to="/gobernadores" className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
              Gobernadores
            </react_router_dom_1.Link>
          </nav>
        </div>
      </div>
    </header>);
}
