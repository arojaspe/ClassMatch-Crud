export type Persona = {
  id: number;
  tipo_doc: string;
  nombre: string;
  fecha_nac: string;
  sexo: string;
  telefono: number;
  id_municipio_origen: number;
  id_vivienda_actual: number;
};

export type Vivienda = {
  id: number;
  direccion: string;
  id_municipio: number;
  capacidad: number;
  niveles: number;
  area: number;
  categoria: string;
  estrato: number;
};
