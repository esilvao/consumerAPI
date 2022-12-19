import info from './funciones.js'
import {getData,valorMonedaArray,siglaMonedaArray} from './datos.js'



async function informacioncurrencies(){
  try{
    const url ="https://api.fastforex.io/fetch-all?from=CLP&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj"
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.currencies
    console.log("resultado : "+ resultado)
   
  }catch(error){
    console.log(error)

  }
}

async function chartValorMoneda(){ 

  await getData()

  const canvas = document.getElementById('grafico'); 


  const grafico1 = new Chart(canvas, { 
  
      type: 'bar', 
      
      data:{
          labels: siglaMonedaArray, 
          datasets: [
              {
                  label: 'Valor Tipo Cambio en USD', 
                  data: valorMonedaArray, 
                  backgroundColor: 'rgb(75, 192, 192)',
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
    console.log(data.start)
    console.log(data.end)
    console.log(data.interval)
    console.log(data.base)
    const resultado = data.results
    let nombre



    nombre = `<div className="col">`
      nombre = nombre +`<div class="card" style="width: 18rem;>`
      nombre = nombre +`div class="card-body"`
          nombre=nombre+`<h5 class="card-title">Fecha de Actualizacion : ${data.updated} </h5>`
          nombre=nombre+`<h5 class="card-title" >Moneda Base : ${data.base} </h5>`
          nombre=nombre+`<p class="card-text">Argentine Peso : ${resultado.ARS} </p>`
          nombre=nombre+`<p class="card-text">Brazilian Real : ${resultado.BRL} </p>`
          nombre=nombre+`<p class="card-text">MEXICO : ${resultado.MXN} </p>`
          nombre=nombre+`<p class="card-text">DOLAR : ${resultado.USD} </p>`
          nombre=nombre+`<p class="card-text">EURO : ${resultado.EUR} </p>`
          nombre=nombre+`<p class="card-text">British Pound Sterling : ${resultado.USD} </p>`
          nombre=nombre+`<a href="#" style="width: 10rem;" class="btn btn-primary">Mas Informacion</a>`
          nombre = nombre+`</div>`
      nombre = nombre+`</div>`
    nombre = nombre+`</div>`
    console.log(`nombre ${nombre}`)
    document.getElementById("fichaInfo").innerHTML= document.getElementById("fichaInfo").innerHTML+nombre
  
  

  }catch(error){
    console.log(error)

  }
}



const divbuscar = document.createElement('div')
divbuscar.innerHTML=`
<div class='mt-3'>
  <h5>Buscar Moneda</h5>
  <input type='text' placeholder='Ingresa NNN moneda' id='inputPais' value='Chilean Peso'> 
  <button id='buscar'> pedir informacion</button>
  <div id='infoTemp'></div>
</div>
<div className="container"> 
    <div className="row" id="fichaInfo">
    </div>
</div>
<div style="height:50%;width:50%;">
<canvas id="grafico" ></canvas>
</div>`

const main = document.getElementById("main")
main.appendChild(divbuscar)

informacionmulti("CLP")
informacionmulti("USD")
informacionmulti("EUR")
chartValorMoneda()