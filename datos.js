let arrayFechaUFAnual = [] , arrayValorUFAnual = []
let arrayFecha = [],arrayValor= []
let arrayListMoneda = [],arrayListMonedaDescrip= []
let arrayValorUF = [],arrayFechaUF= [],arrayValorDolar=[],arrayValorEuro=[]

async function getDataUFAnual(annoConsulta){
    //llena el primer grafico con el valor de la UF durante al año 2022

    const url=`https://api.sbif.cl/api-sbifv3/recursos_api/uf/${annoConsulta}?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
   // console.log(url)
    const response =  await fetch(url)
    const data = await response.json()
    const fechaUF = data.UFs.map(uf => uf.Fecha)
    const valorUF = data.UFs.map(uf => uf.Valor.replace('.', '').replace(',', '.')) 

    arrayFechaUFAnual = fechaUF;
    arrayValorUFAnual = valorUF;
}

async function getDolarUltimoMes(fechaDesde,fechaHasta){
    //lista el valor del dolar de los ultimos 14 dias
    // informacion para el llenar el segundo grefico
    const url =`https://mindicador.cl/api/dolar`
    const response= await  fetch(url)
    const data = await response.json()
    const fechaDolar = data.serie.map((dolar) => {
        let fecha =  new Date(dolar.fecha)
        let month = (fecha.getMonth() + 1).toString().padStart(2, "0");
        let day   = fecha.getDate().toString().padStart(2, "0")
        return fecha.getFullYear() +"-"+ month +"-"+ day;
    });
    const valorDolar = data.serie.map(dolar => dolar.valor) 
    console.log(data.serie.valor)
    arrayFecha = fechaDolar
    arrayValor = valorDolar
}


async function getDataTipoMoneda(){
    //lena droplist con informacion de la sigla y la descripcionde la moneda
    /*
    const options = {method: 'GET', headers: {accept: 'application/json'}};
  
    const url =`https://api.fastforex.io/currencies?api_key=5cfaf0173a-d0bfaf52d3-rn3ftj`
    
    const response= await  fetch(url,options)
    const data = await response.json()
    const resultado = data.currencies
    const valores = JSON.stringify(resultado)

    let datos = JSON.parse(valores, (key, value) => {
        arrayListMoneda.push(key+ "-"+value);
        arrayListMonedaDescrip.push(value);
        return value;
    });

  */
    
}

async function getUFMes(inicador){
    // muestra el valor de la UF del mes
    const url =`https://api.sbif.cl/api-sbifv3/recursos_api/uf/2022/11?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
    const response= await  fetch(url)
    const data = await response.json()
    //.substring(0,name.Valor.length-3)
    const valorUF = data.UFs.map(uf => uf.Valor.replace('.', '').replace(',', '.'))
    
    arrayValorUF=valorUF
    
    const url2 =`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/2022/10?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
    const response2= await  fetch(url2)
    const data2 = await response2.json()
    const ValoresDolar = data2.Dolares.map(dolar => dolar.Valor.replace('.', '').replace(',', '.'))
    const fechaUF = data2.Dolares.map(dolar => dolar.Fecha)
    arrayValorDolar=ValoresDolar
    arrayFechaUF=fechaUF
    const url3 =`https://api.sbif.cl/api-sbifv3/recursos_api/euro/2022/10?apikey=833f4e858f32e7b40a10d7c40ded6661e08811f3&formato=JSON`
    const response3= await  fetch(url3)
    const data3 = await response3.json()
    const ValoresEuro = data3.Euros.map(euro => euro.Valor.replace('.', '').replace(',', '.'))
    arrayValorEuro=ValoresEuro

}
export {getDataUFAnual, arrayFechaUFAnual,arrayValorUFAnual,
        getDolarUltimoMes,arrayFecha,arrayValor,
        getDataTipoMoneda,arrayListMoneda,arrayListMonedaDescrip,
        getUFMes,arrayValorUF,arrayFechaUF,arrayValorDolar,arrayValorEuro}; 