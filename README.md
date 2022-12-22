
Proyecto de consumo de API
  Esta aplicacion muestra una pagina principal con informacion de:
    1.- Consumo de API en el Drowlist con el listado de ls distintas monedas
    2.- Al buscar una moneda y hacer click en el boton agregar , se agrega informacion de esa monesa y su conversion a Dolar,Euro y peso chileno 
    3.- al hacer click en limpiar va a eliminar todas la fichas de monedas creadas y dejea en pantalla solo los graficos
    4.- los graficos muestra informacion de 
        1.- Se muestra malor de la UF, Dolar y Euro de un mes determinado Se usa Chart en grafico de barra
        2.- Valor del doler de los ultimos 14 dias (lee la fecha actual). Se usa Chart en grafico de barra
        3.- UF del año 2022 () Se usa Chart en grafico de linea
        
Se trabaja con indicadores economicos diarios con api proporcionada porComisión para el Mercado Financiero - Chile (https://api.sbif.cl/terminos-de-uso.html), debe tener APIkey 

Se trabaja con API publica para la conversion de monedas (https://fastforex.readme.io/reference/get_currencies) , esta api tambien solicita ApiKey

Se trabaja con canvas , pero no se necesita instalar ya que  se usa la etiqueta  de javascrip que permite su uso sin instalacion de librerias locales 
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>



