
<h1>Proyecto de consumo de API</h1>

  <h5>Instalación</h5>
  La aplicacion no necesita instalacion de librerias adicionales, usa Chart.js para crear graficos, pero se incluye dentro del HTML con la etiqueta <script></script>. Las APIS utilizadas son libres pero deben tener APIKey ya incluidas en el proyecto
 
  <h5>Descripción y Uso</h5>
  Esta aplicacion muestra una pagina principal con informacion de:
    1.- Drowlist con el listado de ls distintas monedas (consumo de API fastforex)
    2.- Al buscar una moneda y hacer click en el boton agregar , se agrega informacion de esa moneda y su conversion a Dolar,Euro y peso chileno 
    3.- al hacer click en limpiar va a eliminar todas la fichas de monedas creadas y dejea en pantalla solo los graficos
    4.- los graficos muestra informacion de 
        1.- Se muestra malor de la UF, Dolar y Euro de un mes determinado Se usa Chart en grafico de barra (se pueden seleccionar y desmarcar los distintas opciones)
        2.- Valor del doler de los ultimos 14 dias (lee la fecha actual). Se usa Chart en grafico de barra.
        3.- UF del año 2022 () Se usa Chart en grafico de linea.
    5.- EN el pie de pagina se muestra cajitas con distintos indicadores den dia como UF,UTM,Dolar,EURO,IPV (qui de usa la api.sbif pue proporciona los indicares mensionados)

Se trabaja con indicadores economicos diarios con api proporcionada porComisión para el Mercado Financiero - Chile (https://api.sbif.cl/terminos-de-uso.html), para esta api se solicito acceso y nos proporcionaron un APIkey para conectarnos

Se trabaja con API publica para la conversion de monedas (https://fastforex.readme.io/reference/get_currencies) , esta api tambien solicita ApiKey (este api key dura solo 7 dias)

Se trabaja con canvas , pero no se necesita instalar ya que  se usa la etiqueta  de javascrip que permite su uso sin instalacion de librerias locales 
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></



