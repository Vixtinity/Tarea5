export const getMinMaxDates = () => {
  const hoy = new Date();
  const minFecha = new Date(hoy);
  minFecha.setDate(hoy.getDate() + 7);
  
  const maxFecha = new Date(hoy);
  maxFecha.setFullYear(hoy.getFullYear() + 1);

  return {
    min: minFecha.toISOString().split('T')[0],
    max: maxFecha.toISOString().split('T')[0]
  };
};