import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-5 bg-teal-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/">
              <img
                src="/img/LogoText.png"
                alt="Logo"
                className="h-20 fill-white hover:opacity-25 duration-200 rounded-xl"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-4">
            <Link
              to="/personas"
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
            >
              Personas
            </Link>
            <Link
              to="/viviendas"
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
            >
              Viviendas
            </Link>
            <Link
              to="/gobernadores"
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
            >
              Gobernadores
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
