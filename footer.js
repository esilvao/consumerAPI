let colDespIndicador="",colImagenFooter=""
let valorIndicador =""
let valorNombre =""

  function dibujaColFooterIMG(){
    const colImagen = `<div class="col">
    <div class="box-foorter">
      <div class="logo">
        <img src="https://pixabay.com/static/uploads/photo/2016/04/01/22/32/world-1301744_960_720.png" style="width:50px ;" alt="">
      </div>
      <div class="descrip-logo">
        <p>Indicadores Economicos </p>
      </div>
    </div>
  </div> ` 
  colImagenFooter=colImagen
  }
  
  async function dibujaColFooter(indicador){
    await getApiIndicado(indicador.toLowerCase())
    const columnaIndicador =` <div class="col d-flex justify-content-evenly" >
            <div class="card-footer rounded-3" >
              <div class="card-body">
                <h6 class="card-title">${indicador}</h6>
                <p class="card-text"><small>${valorNombre}</small></p>
                <p class="card-text d-flex justify-content-center "><small>${valorIndicador}</small></p>
              </div>
            </div>
          </div>`
    colDespIndicador=colDespIndicador+columnaIndicador
    
  }
  async function getApiIndicado(inicador){
    const url =`https://mindicador.cl/api`
    const response= await  fetch(url)
    const data = await response.json()
    
    switch (inicador) {
      case 'uf':
          valorIndicador = data.uf.valor
          valorNombre=data.uf.nombre
          break
      case "utm":
          valorIndicador = data.utm.valor
          valorNombre=data.utm.nombre
          break
      case "dolar":
          valorIndicador = data.dolar.valor
          valorNombre=data.dolar.nombre
          break
      case "ivp": 
          valorIndicador = data.ivp.valor
          valorNombre=data.ivp.nombre
          break
      case "ipc":
          valorIndicador = data.ipc.valor
          valorNombre=data.ipc.nombre
          break
      case "imacec":
          valorIndicador = data.imacec.valor
          valorNombre=data.imacec.nombre
          break
      default:
        console.log("valorUF "+ valorIndicador)
    }
  }
export {dibujaColFooter,dibujaColFooterIMG,colImagenFooter,colDespIndicador}