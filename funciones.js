async function informacionTemperatura(){
  try{
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+inputPais.value+"&appid=616629f9acdc3b22b8b09553e632e5da"
    const response= await  fetch(url)
    const data = await response.json()
    const temperatura = data.main.temp
    return  temperatura

  }catch(error){
    console.log(error)

  }
}

export default {informacionTemperatura}