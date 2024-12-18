import React, { useEffect, useState } from "react";
import axios from "axios";
import { Persona } from "../types";

const PersonasPage: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/personas")
      .then((response) => {
        setPersonas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Personas</h1>
      <ul className="text-white">
        {personas.map((persona) => (
          <li key={persona.id}>
            {persona.nombre}, {persona.sexo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonasPage;
