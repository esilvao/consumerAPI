let fechaDesde,fechaHasta

 function getFecha(){
  const hoy = new Date();
  let month = (hoy.getMonth() + 1).toString().padStart(2, "0");
  let day   = hoy.getDate().toString().padStart(2, "0")
  const fechaActual = hoy.getFullYear() +"-" +month+ "-"+ day
  var dias = 12;
  var fechaInicioRepo = new Date(fechaActual);     
  fechaInicioRepo.setDate(fechaInicioRepo.getDate() - dias);
  month = (fechaInicioRepo.getMonth() + 1).toString().padStart(2, "0");
  day   = fechaInicioRepo.getDate().toString().padStart(2, "0")
  let fechaInicio= fechaInicioRepo.getFullYear() + '-' +  month + '-' + day;
  fechaDesde=fechaInicio
  fechaHasta=fechaActual
}

export {getFecha, fechaDesde,fechaHasta}; 