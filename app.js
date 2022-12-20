import {getFecha,fechaDesde,fechaHasta}  from './fecha.js'
import {getData,valorMonedaArray,siglaMonedaArray,
       arrayValor,arrayFecha,getDataUltimosDias,
       getDataTipoMoneda,arrayListMoneda,arrayListMonedaDescrip} from './datos.js'

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

async function informacionmulti(modendaBase){
  try{
    const url =`https://api.fastforex.io/fetch-multi?from=${modendaBase}&to=%20ARS%2CBRL%2CMXN%2CUSD%2CEUR%2CGBP&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.results
    let nombre
    nombre = `<div class="col d-flex justify-content-around" >`
      nombre = nombre +`<div class="card" style="width: 18rem;" >`
      nombre = nombre +`<div class="card-body">`          
          nombre=nombre+`<h5 class="card-title d-flex justify-content-center" >Moneda : 1 ${data.base} </h5>`
          nombre=nombre+`<p class="card-text font-weight-bold d-flex justify-content-center">${data.updated} </p>`
          nombre=nombre+`<hr>`
          nombre=nombre+`<p class="card-text ">Peso Argentino: ${resultado.ARS} </p>`
          nombre=nombre+`<p class="card-text ">Real brasileño: ${resultado.BRL} </p>`
          nombre=nombre+`<p class="card-text ">Peso Mexicano : ${resultado.MXN} </p>`
          nombre=nombre+`<p class="card-text ">Dolar : ${resultado.USD} </p>`
          nombre=nombre+`<p class="card-text ">Euro : ${resultado.EUR} </p>`
          nombre=nombre+`<p class="card-text ">Libra esterlina : ${resultado.USD} </p>`
          nombre=nombre+`<p class="d-flex justify-content-center"><a href="#" style="width: 10rem;" class="btn btn-secondary">Mas Informacion</a></p>`
          nombre = nombre+`</div>`
      nombre = nombre+`</div>`
    nombre = nombre+`</div>`
   
    document.getElementById("fichaInfo").innerHTML= document.getElementById("fichaInfo").innerHTML+nombre
  
  

  }catch(error){
    console.log(error)

  }
}



const divbuscar = document.createElement('div')
divbuscar.innerHTML=`
<div class='mt-3'>
  <h5>Buscar Moneda</h5>
  <select id = "selectMoneda"> 
  </select>
  <div id='infoTemp'></div>
</div>
<div class="container"> 
    <div class="row" id="fichaInfo">
    </div>
</div>
<div style="height:50%;width:50%;">
<canvas id="grafico1" ></canvas>

<canvas id="grafico2" ></canvas>
</div>`

const main = document.getElementById("main")
main.appendChild(divbuscar)
informacionmulti("EUR")
informacionmulti("USD")
informacionmulti("CLP")
informacioncurrencies()

getDataTipoMoneda()
chartValorMoneda()
listarMoneda()