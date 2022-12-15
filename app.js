import info from "./funciones.js"


const datosTemp = document.getElementById("infoTemp")
const newDiv = document.createElement("div");
const currentDiv = document.getElementById("infoTemp");




function iniciarMap(){
  console.log("CARGA")
  var coord = {lat:-34.5956145 ,lng: -58.4431949}
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  })
}

const btn_buscar = document.getElementById("buscar")
btn_buscar.addEventListener("click",(e) => {
  e.preventDefault()
  info.informacionTemperatura()
  .then(value => { 
    const h6Temp = document.createElement("div");
    const infoTemp = document.getElementById("infoTemp");
    h6Temp.innerText = "Temperatura Actual  " +inputPais.value + " " +value
    infoTemp.appendChild(h6Temp);
  })
  .catch(err => { 
    console.log(err) 
  });
  
})

