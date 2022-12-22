
<h1>Proyecto de consumo de API</h1>

  <h2>Instalación</h2>
  La aplicacion no necesita instalacion de librerias adicionales, usa Chart.js para crear graficos, pero se incluye dentro del HTML con la etiqueta <script></script>. Las APIS utilizadas son libres pero deben tener APIKey ya incluidas en el proyecto
 
  <h2>Descripción y Uso</h2>
  Esta aplicacion muestra una pagina principal con informacion de:
  <ul>
    <li>Drowlist con el listado de ls distintas monedas (consumo de API fastforex)</li>
    <li>Al buscar una moneda y hacer click en el boton agregar , se agrega informacion de esa moneda y su conversion a Dolar,Euro y peso chileno </li>
    <li>Al hacer click en limpiar va a eliminar todas la fichas de monedas creadas y dejea en pantalla solo los graficos</li>
    <li>Los graficos muestra informacion de : </li>
        <ul>
          <li> Se muestra malor de la UF, Dolar y Euro de un mes determinado Se usa Chart en grafico de barra (se pueden seleccionar y desmarcar los distintas opciones).</li>
          <li>Valor del doler de los ultimos 14 dias (lee la fecha actual). Se usa Chart en grafico de barra.</li>
          <li>UF del año 2022 () Se usa Chart en grafico de linea.</li>
        </ul>
    <li>EN el pie de pagina se muestra cajitas con distintos indicadores den dia como UF,UTM,Dolar,EURO,IPV (qui de usa la api.sbif pue proporciona los indicares mensionados)</li>
 </ul>
<div>
Se trabaja con indicadores economicos diarios con api proporcionada porComisión para el Mercado Financiero - Chile (https://api.sbif.cl/terminos-de-uso.html), para esta api se solicito acceso y nos proporcionaron un APIkey para conectarnos
</div>
<div>
Se trabaja con API publica para la conversion de monedas (https://fastforex.readme.io/reference/get_currencies) , esta api tambien solicita ApiKey (este api key dura solo 7 dias)
</div>

<div>
Se trabaja con canvas , pero no se necesita instalar ya que  se usa la etiqueta  de javascrip que permite su uso sin instalacion de librerias locales 
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</div>



