let valorMonedaArray = [] , siglaMonedaArray = []
let arrayFecha = [],arrayValor= []
let arrayListMoneda = [],arrayListMonedaDescrip= []
let arrayValorUF = [],arrayFechaUF= [],arrayValorDolar=[],arrayValorEuro=[]

async function getData(tipodato){
    //llena el primer grafico el el tipo de moneda que recive por parametro
    // y muetra su equivalende en la moneda de destino por defecto son
    //peso arg ARS
    //moneda de brasil BRL
    //moneda de mexico MXN
    //peso chileno CLP
    //DOLAR USD
    //euro EUR
    //GBP
    const url="https://api.fastforex.io/fetch-multi?from="+tipodato+"&to=ARS%2CBRL%2CMXN%2CCLP%2CEUR%2CGBP%2CPEN%2CCNY%2CUSD&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj"
    const response =  await fetch(url)
    const data = await response.json()
    const resultado = data.results 
    const valores = JSON.stringify(resultado)
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
    //lista el valor del dolar de los ultimos 14 dias
    // informacion para el llenar el segundo grefico
    const url =`https://api.fastforex.io/time-series?to=CLP&start=${fechaDesde}&end=${fechaHasta}&interval=P1D&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.results
    const valores = JSON.stringify(resultado.CLP)
    console.log ("valores " +valores)
    let datos = JSON.parse(valores, (key, value) => {
      arrayFecha.push(key);
      arrayValor.push(value);
      return value;

    });
}


async function getDataTipoMoneda(){
    //lena droplist con informacion de la sigla y la descripcionde la moneda
    const url =`https://api.fastforex.io/currencies?api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    
    const response= await  fetch(url)
    const data = await response.json()
    const resultado = data.currencies
    const valores = JSON.stringify(resultado)
    

    let datos = JSON.parse(valores, (key, value) => {
        arrayListMoneda.push(key+ "-"+value);
        arrayListMonedaDescrip.push(value);
        return value;
    });

  
    
}

async function getUFMes(inicador){
    // muestra el valor de la UF del mes
    const url =`https://api.sbif.cl/api-sbifv3/recursos_api/uf/2022/11?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
    const response= await  fetch(url)
    const data = await response.json()
    //.substring(0,name.Valor.length-3)
    const valorUF = data.UFs.map(name => name.Valor.replace('.', '').replace(',', '.'))
    
    arrayValorUF=valorUF
    
    const url2 =`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/2022/10?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
    const response2= await  fetch(url2)
    const data2 = await response2.json()
    const ValoresDolar = data2.Dolares.map(name => name.Valor.replace('.', '').replace(',', '.'))
    const fechaUF = data2.Dolares.map(name => name.Fecha)
    arrayValorDolar=ValoresDolar
    arrayFechaUF=fechaUF
    const url3 =`https://api.sbif.cl/api-sbifv3/recursos_api/euro/2022/10?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
    const response3= await  fetch(url3)
    const data3 = await response3.json()
    const ValoresEuro = data3.Euros.map(name => name.Valor.replace('.', '').replace(',', '.'))
    arrayValorEuro=ValoresEuro

}
export {getData, valorMonedaArray,siglaMonedaArray,
        getDataUltimosDias,arrayFecha,arrayValor,
        getDataTipoMoneda,arrayListMoneda,arrayListMonedaDescrip,
        getUFMes,arrayValorUF,arrayFechaUF,arrayValorDolar,arrayValorEuro}; 