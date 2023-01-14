import {dibujaColFooterIMG,dibujaColFooter,colImagenFooter,colDespIndicador} from './footer.js'
import {getFecha,fechaDesde,fechaHasta}  from './fecha.js'
import {getDataUFAnual,arrayFechaUFAnual,arrayValorUFAnual,
       arrayValor,arrayFecha,getDolarUltimoMes,
       getDataTipoMoneda,arrayListMoneda,arrayListMonedaDescrip,
       getUFMes,arrayValorUF,arrayFechaUF,arrayValorDolar,arrayValorEuro} from './datos.js'


//Crear el contenido del main
const divbuscar = document.createElement('div')
divbuscar.innerHTML=`
<div class='mt-3'>
<div id='infoFecha'></div>
  <h6>Buscar Moneda</h6>
  <select id = "selectMoneda"> 
  </select>
  <button type="button" class="rounded-3 miboton" id="agregar">Agregar</button>
  <button  class="rounded-3 miboton" id="limpiar">Limpiar</button>
  
  <div class="p-2" id='infoTemp'></div>
</div>
<div>Principales Indicadores Económicos y Conversor de Monedas</div>
<div class="container"> 
    <div class="row" id="fichaInfo">
    </div>
</div>
<hr>
<div class="container">
  <div class="row">
    <div class="col-12 col-sm-12 col-lg-6">
        <canvas id="grafico1" ></canvas>
    </div>
    <div class="col-12 col-sm-12 col-lg-6">
        <canvas id="grafico2" ></canvas>
    </div>
    <div class="col-12">
    <canvas id="grafico3" ></canvas>
</div>
  </div>
</div>`


const main = document.getElementById("main")
main.appendChild(divbuscar)

//Crear el contenido del footer
const divfooter = document.createElement('div')
divfooter.className="container"
divfooter.id="containerFooter"
const footer = document.getElementById("footer")
footer.appendChild(divfooter)

const btn_agregar = document.querySelector("#agregar")
btn_agregar.addEventListener("click",(e) => {
  e.preventDefault()
  var option = document.getElementById("selectMoneda");
  let moneda = option.value
  alert("Se va a cargar una ficha \n con informacion de conversion de 1 \n " + moneda.substring(4) )
  informacionmulti(moneda.substring(0,3))

})

const btn_limpiar = document.querySelector("#limpiar")
btn_limpiar.addEventListener("click",(e) => {
  e.preventDefault()
  linpiarInfoFicha()
})


informacionmulti("USD")
informacionmulti("EUR")
dropListMoneda()
chartValorUFANNO()
charDolarMes()
chartValorUFDolarEuroMes()
dibujaFooter()

async function dropListMoneda(){
  // llana el droplist que esta al principio de la pagina
// con informacion del la sigla y el tipo de moneda

  await getDataTipoMoneda()
  var select = document.getElementById("selectMoneda");
  arrayListMoneda.forEach ((value)=>{
    var option = document.createElement("option");
    option.value = value;
    option.text = value;
    select.appendChild(option);
    })
    

 }

 // dinuja el footer
 //crea una caja por cada indicador economico que se quiera mostrar
 async function dibujaFooter(){
  await dibujaColFooterIMG()
  await dibujaColFooter("UF")
  await dibujaColFooter("UTM")
  await dibujaColFooter("Dolar")
  await dibujaColFooter("IVP")
  await dibujaColFooter("IPC")
  await dibujaColFooter("IMAC")
  var divfooter = document.getElementById("containerFooter");
  var divrow = document.createElement("div");
  divrow.className="row align-items-center"
  divrow.id="rowfooter"
  divrow.innerHTML=colImagenFooter+colDespIndicador
  divfooter.appendChild(divrow);
 
}


async function chartValorUFDolarEuroMes(){ 
  // llena el primer grafico con informacion de UF,Dolar y Euro
  //el mes se deja fijo
    await getUFMes()
    const canvas = document.getElementById('grafico1'); 
    const grafico1 = new Chart(canvas, {     
        type: 'bar',       
        data:{
            labels: arrayFechaUF, 
            datasets: [
                {
                    label: 'Valor UF Mes', 
                    data: arrayValorUF, 
                    backgroundColor: 'rgb(75, 192, 192)',
                },
                {
                  label: 'Valor Dolar Mes', 
                  data: arrayValorDolar, 
                  backgroundColor: 'rgb(0, 100, 204)',
                },
                {
                  label: 'Valor Euro Mes', 
                  data: arrayValorEuro, 
                  backgroundColor: 'rgb(51,153,102)',
                }
            ]
        },
    }) 
  }

async function charDolarMes(){
// llena el segundo grafico con informacion de los ultimos 14 dias
//lee la fecha actual y le resta los dias
  try{
    await getFecha()
    await getDolarUltimoMes(fechaDesde,fechaHasta)
    const canvas = document.getElementById('grafico2'); 
    const grafico2 = new Chart(canvas, {     
        type: 'bar',       
        data:{
            labels: arrayFecha , 
            datasets: [
                {
                    label: 'Valor USD / CPL Ultimo mes', 
                    data: arrayValor, 
                    backgroundColor: 'rgb(75, 192, 192)',
                }
            ]
        },            
    }) 

  }catch(error){
    console.log(error)

  }
}





async function chartValorUFANNO(){ 
  await getDataUFAnual("2022")
  const canvas = document.getElementById('grafico3'); 
  const grafico3 = new Chart(canvas, { 
      type: 'line',       
      data:{
          labels: arrayFechaUFAnual, 
          datasets: [
              {
                  label: 'Valor UF 2022', 
                  data: arrayValorUFAnual, 
                  backgroundColor: 'rgb(75, 192, 192)',
              },
          ]
      },
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
  }) 
}
//****************************************************** */

function linpiarInfoFicha() {
  document.getElementById("fichaInfo").innerHTML=""
}

async function informacionmulti(modendaBase){
  try{
    console.log("linpiarInfoFicha")
    
    const url =`https://api.fastforex.io/fetch-multi?from=${modendaBase}&to=%20CLP%2CBRL%2CMXN%2CUSD%2CEUR%2CGBP&api_key=ceba487744-b488709e8e-rohjdj`
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.results
    let nombre
    let titulo=`<h6 class="font-weight-bold d-flex justify-content-center">Informe Economico</h6>`
    nombre = `<div class="col d-flex justify-content-around" >`
      nombre = nombre +`<div class="card" style="width: 16rem;" >`
          nombre=nombre+`<h6 class="card-title d-flex justify-content-center" >Moneda : 1 ${data.base} </h6>`
          //nombre=nombre+`<p ><small>Peso Argentino: ${resultado.ARS}</small></p>`
          //nombre=nombre+`<p ><small>Real brasileño: ${resultado.BRL}</small></p>`
          //nombre=nombre+`<p ><small>Peso Mexicano : ${resultado.MXN}</small></p>`
          nombre=nombre+`<p ><small>Dolar : ${resultado.USD}</small> </p>`
          nombre=nombre+`<p ><small>Euro : ${resultado.EUR} </small></p>`
          nombre=nombre+`<p ><small>Peso Chileno : ${resultado.CLP} </small> </p>`
          nombre=nombre+`<p class="d-flex justify-content-center"><a href="#" style="width: 10rem;" > <small>Mas Informacion </small></a></p>`
        nombre = nombre+`</div>`
    nombre = nombre+`</div>`
    document.getElementById("infoFecha").innerHTML= titulo
    document.getElementById("fichaInfo").innerHTML= document.getElementById("fichaInfo").innerHTML+nombre
    
  }catch(error){
    console.log(error)
  }
}
