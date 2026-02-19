export const rNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
export const rNif = /^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$/;
export const rTelefono = /^[679][0-9]{8}$/;
export const rEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const rComentario = /^(?!\s*$).+/;