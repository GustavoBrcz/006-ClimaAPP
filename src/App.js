import React, {Fragment, useState, useEffect} from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";


function App() {

  // El useState que va a almacenar los datos
  const [busqueda, guardarBusqueda] = useState({
    ciudad: " ",
    pais: " "
  }); // El State inicia con los valores vacios

  // Aplicamos el destructuring nuevamente

  const { ciudad, pais } = busqueda;

  // Creando un State para mostrar la consulta

  const [ consultar, guardarConsultar ] = useState(false);


  // Para poder pasar el resultado a un componente, debemos iniciar con un State

  const [resultado, guardarResultado] = useState({});


  const [mostrarError, guardarMostrarError] = useState(false);

  // Consultar la API, en este caso se usa un useEffect, que será el que cambiará a medida que se colocan cosas nuevas

  useEffect(() => {
    
    const consultarAPI = async () => {

      if(consultar === true) {
        const API = '359d1b09b1d27fae18d00007013c8767';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API}`;
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        guardarResultado(resultado)

        guardarConsultar(false); // Para poder realizar varias consultas; Una vez obtengo un resultado, apaga el State


        // Detectar si hay resultados correctos en la consulta
        if(resultado.cod === "404") {
          guardarMostrarError(true)
        }else {
          guardarMostrarError(false)
        }
      }
    }

    consultarAPI()
   
    return; 
  }, [ciudad, pais, consultar])

  let componente;
  if(mostrarError) {
    componente = <Error mensaje="No hay resultados"/>
  } else {
    componente = <Clima resultado={resultado} />
  }


  return (
    <Fragment>
      <Header
        titulo="React Clima App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                guardarBusqueda={guardarBusqueda}
                busqueda={busqueda}

                guardarConsultar={guardarConsultar}
              />
            </div>

            <div className="col m6 s12">
              
              {componente}
             
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  

  );
}



export default App;
