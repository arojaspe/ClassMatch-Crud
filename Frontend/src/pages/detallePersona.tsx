import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Persona } from "../types";

const DetallePersonaPage = () => {
  const { id } = useParams();
  const [persona, setPersona] = useState<Persona>();

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/personas/${id}`
        );
        const data = await response.json();
        setPersona(data);
      } catch (error) {
        console.error("Error fetching persona:", error);
      }
    };

    fetchPersona();
  }, [id]);

  if (!persona) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle de Persona</h1>
      <p>Nombre: {persona.nombre}</p>
      <p>Sexo: {persona.sexo}</p>
      {/* Agrega más detalles aquí */}
    </div>
  );
};

export default DetallePersonaPage;
