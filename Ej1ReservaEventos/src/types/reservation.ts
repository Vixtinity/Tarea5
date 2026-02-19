export interface FormularioData {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  tipoEvento: string;
  fechaEvento: string;
  horaInicio: string;
  asistentesNumber: number;
  catering: string[];
  presupuesto: string;
  comentario: string;
  terminos: boolean;
}

export interface ErroresFormulario {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  comentario: string;
}