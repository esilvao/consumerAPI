let valorMonedaArray = [] , siglaMonedaArray = []
let arrayFecha = [],arrayValor= []
let arrayListMoneda = [],arrayListMonedaDescrip= []

async function getData(tipodato){
    const url="https://api.fastforex.io/fetch-multi?from="+tipodato+"&to=ARS%2CBRL%2CMXN%2CCLP%2CEUR%2CGBP%2CPEN%2CCOP%2CCNY%2CUSD&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj"
    const response =  await fetch(url)
    const data = await response.json()
    console.log("url : "+ url)
    const resultado = data.results 
    const valores = JSON.stringify(resultado)
    console.log ("valores ss" +valores)
    const valorMoneda = [] , siglaMoneda = []    
    let datos = JSON.parse(valores, (key, value) => {
        siglaMoneda.push(key);
        valorMoneda.push(value);
        return value;
    });

    valorMonedaArray = valorMoneda;
    siglaMonedaArray = siglaMoneda;
}

async function getDataUltimosDias(fechaDesde,fechaHasta){
    const url =`https://api.fastforex.io/time-series?to=CLP&start=${fechaDesde}&end=${fechaHasta}&interval=P1D&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.results
    /*
    const start = data.start
    const end = data.end
    const base = data.base
    const resultado = data.results
    */
   
    const valores = JSON.stringify(resultado.CLP)
    console.log ("valores " +valores)
    
    const userObj=JSON.parse(JSON.stringify(resultado.CLP))
    const fechaArray = [], valorArray = []
    let datos = JSON.parse(valores, (key, value) => {
      arrayFecha.push(key);
      arrayValor.push(value);
      return value;

    });
}


async function getDataTipoMoneda(){
    const url =`https://api.fastforex.io/currencies?api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data
    const valores = JSON.stringify(resultado)
    

    let datos = JSON.parse(valores, (key, value) => {
        console.log("key Moneda " + key)
        arrayListMoneda.push(key+ "-"+value);
        console.log("value Moneda " + value)
        arrayListMonedaDescrip.push(value);
      return value;
    });
}


export {getData, valorMonedaArray,siglaMonedaArray,
        getDataUltimosDias,arrayFecha,arrayValor,
        getDataTipoMoneda,arrayListMoneda,arrayListMonedaDescrip}; 