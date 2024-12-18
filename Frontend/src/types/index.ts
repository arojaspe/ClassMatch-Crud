export type Departamento = {
  id: number;
  nombre: string;
  pais: string;
};

export type Municipio = {
  id: number;
  nombre: string;
  id_departamento: number;
  departamento: Departamento; // Relación con Departamento
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
  municipio: Municipio; // Relación con Municipio
};

export type Persona = {
  id: number;
  tipo_doc: string;
  nombre: string;
  fecha_nac: string;
  sexo: string;
  telefono: number;
  id_municipio_origen: number;
  id_vivienda_actual: number;
  vivienda: Vivienda; // Relación con Vivienda
  municipio: Municipio; // Relación con Municipio
};

export type RegistroPersona = {
  id_persona: number;
  id_departamento: number;
  fecha_registro: string;
  departamento: Departamento; // Relación con Departamento
  persona: Persona; // Relación con Persona
};

export type Gobernador = {
  id: number;
  nombre: string;
  fecha_registro: string;
  persona: Persona; // Relación con Persona
  municipio: Municipio; // Relación con Municipio
};
