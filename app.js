import {dibujaColFooterIMG,dibujaColFooter,colImagenFooter,colDespIndicador} from './footer.js'
import {getFecha,fechaDesde,fechaHasta}  from './fecha.js'
import {getData,valorMonedaArray,siglaMonedaArray,
       arrayValor,arrayFecha,getDataUltimosDias,
       getDataTipoMoneda,arrayListMoneda,arrayListMonedaDescrip,
       getUFMes,arrayValorUF,arrayFechaUF,arrayValorDolar,arrayValorEuro} from './datos.js'

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
async function listarMoneda(){
  await getDataTipoMoneda()
  var select = document.getElementById("selectMoneda");
  arrayListMoneda.forEach ((value)=>{
    var option = document.createElement("option");
    option.value = value;
    option.text = value;
    select.appendChild(option);
    })
 

}

async function informacioncurrencies(){
  try{
    await getFecha()
    await getDataUltimosDias(fechaDesde,fechaHasta)
    const canvas = document.getElementById('grafico2'); 
    const grafico2 = new Chart(canvas, { 
    
        type: 'bar',       
        data:{
            labels: arrayFecha , 
            datasets: [
                {
                    label: 'Valor USD/CPL 14 dias', 
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

async function chartValorUFMes(){ 

  await getUFMes()
  console.log("data "+ arrayValorUF)
  console.log("data "+ arrayFechaUF)
  console.log("data "+ arrayValorDolar)
  const canvas = document.getElementById('grafico3'); 
  const grafico3 = new Chart(canvas, { 
  
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
                backgroundColor: 'rgb(175, 200, 200)',
              },
              {
                label: 'Valor Euro Mes', 
                data: arrayValorEuro, 
                backgroundColor: 'rgb(175, 100, 100)',
              }
          ]
      },
          
  }) 

}
async function chartValorMoneda(){ 

  await getData("USD")
  
  const valorMonedaArrayUSD =  valorMonedaArray.map((x) => x);
  await getData("CLP")
  const valorMonedaArrayCLP  =  valorMonedaArray.map((x) => x);
  const canvas = document.getElementById('grafico1'); 
  const grafico1 = new Chart(canvas, { 
  
      type: 'bar',       
      data:{
          labels: siglaMonedaArray, 
          datasets: [
              {
                  label: 'Valor Tipo Cambio en USD', 
                  data: valorMonedaArrayUSD, 
                  backgroundColor: 'rgb(75, 192, 192)',
              },
              {
                label: 'Valor Tipo Cambio en CLP', 
                data: valorMonedaArrayCLP, 
                backgroundColor: 'rgb(15, 92, 230)',
            }
          ]
      },
          
  }) 

}

function linpiarInfoFicha() {
  document.getElementById("fichaInfo").innerHTML=""
}

async function informacionmulti(modendaBase){
  try{
    const url =`https://api.fastforex.io/fetch-multi?from=${modendaBase}&to=%20ARS%2CBRL%2CMXN%2CUSD%2CEUR%2CGBP&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.results
    let nombre
    let titulo=`<h5 class="font-weight-bold d-flex justify-content-center">Informe de conversion de monedas ${data.updated}  </h5>`
    nombre = `<div class="col d-flex justify-content-around" >`
      nombre = nombre +`<div class="card" style="width: 16rem;" >`
                
          nombre=nombre+`<h6 class="card-title d-flex justify-content-center" >Moneda : 1 ${data.base} </h6>`
          nombre=nombre+`<hr>`
          nombre=nombre+`<p ><small>Peso Argentino: ${resultado.ARS}</small></p>`
          nombre=nombre+`<p ><small>Real brasileño: ${resultado.BRL}</small></p>`
          nombre=nombre+`<p ><small>Peso Mexicano : ${resultado.MXN}</small></p>`
          nombre=nombre+`<p ><small>Dolar : ${resultado.USD}</small> </p>`
          nombre=nombre+`<p ><small>Euro : ${resultado.EUR} </small></p>`
          nombre=nombre+`<p ><small>Libra esterlina : ${resultado.USD} </small> </p>`
          nombre=nombre+`<p class="d-flex justify-content-center"><a href="#" style="width: 10rem;" > <small>Mas Informacion </small></a></p>`
          
      nombre = nombre+`</div>`
    nombre = nombre+`</div>`
    document.getElementById("infoFecha").innerHTML= titulo
    document.getElementById("fichaInfo").innerHTML= document.getElementById("fichaInfo").innerHTML+nombre
  
  

  }catch(error){
    console.log(error)

  }
}


//Crear el contenido del main
const divbuscar = document.createElement('div')
divbuscar.innerHTML=`
<div class='mt-3'>
<div id='infoFecha'></div>
  <h6>Buscar Moneda</h6>
  <select id = "selectMoneda"> 
  </select>
  <input class="btn rounded-3 btn_propio" id="agregar" type="button" value="Agregar">
  <input class="btn rounded-3 btn_propio" id="limpiar" type="button" value="Limpiar">
  <div id='infoTemp'></div>
</div>
<div class="container"> 
    <div class="row" id="fichaInfo">
    </div>
</div>

<div class="container">
  <div class="row">
    <div class="col">
        <canvas id="grafico1" ></canvas>
    </div>
    <div class="col">
        <canvas id="grafico2" ></canvas>
    </div>
    <div class="col">
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
dibujaFooter()


informacionmulti("USD")
informacionmulti("CLP")
informacioncurrencies()
getDataTipoMoneda()
chartValorMoneda()
listarMoneda()
chartValorUFMes()

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


