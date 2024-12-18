import React, { useEffect, useState } from "react";
import axios from "axios";
import { Persona } from "../types";

const PersonasPage: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/personas")
      .then((response) => {
        setPersonas(response.data.personas);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-5xl">Personas</h1>
      <ul className="text-black">
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
