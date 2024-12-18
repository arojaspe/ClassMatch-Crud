import React, { useEffect, useState } from "react";
import axios from "axios";
import { Vivienda } from "../types";

const ViviendasPage: React.FC = () => {
  const [viviendas, setPersonas] = useState<Vivienda[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/viviendas")
      .then((response) => {
        setPersonas(response.data.viviendas);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-5xl">Viviendas</h1>
      <ul className="text-black">
        {viviendas.map((vivienda) => (
          <li key={vivienda.id}>
            {vivienda.direccion}, {vivienda.categoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViviendasPage;
