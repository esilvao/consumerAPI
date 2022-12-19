let valorMonedaArray = [] , siglaMonedaArray = []

async function getData(){
    const url="https://api.fastforex.io/fetch-multi?from=USD&to=ARS%2CBRL%2CMXN%2CCLP%2CEUR%2CGBP%2CPEN%2CCOP%2CCNY%2CUSD&api_key=5cfaf0173a-d0bfaf52d3-rn3ftj"
    const response =  await fetch(url)
    const data = await response.json()
    const resultado = data.results     
   
    valorMonedaArray.push(resultado.ARS,resultado.BRL,resultado.MXN,resultado.CLP,resultado.EUR,resultado.GBP,resultado.PEN,resultado.COP,resultado.CNY,resultado.USD)
    siglaMonedaArray.push("ARS","BRL","MXN","CLP","EUR","GBP","PEN","COP","CNY","USD")
    
}
export {getData, valorMonedaArray,siglaMonedaArray}; 