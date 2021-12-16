import React, {useState} from "react";
import Error from "./Error";
import PropTypes from "prop-types";



const Formulario = ({guardarBusqueda, busqueda, guardarConsultar}) => {


    // State que mostrará el error

    const [error, guardarError] = useState(false)

    // Aplicar un Destructuring para luego validarlos posteriormente

    const { ciudad, pais } = busqueda; // El destructuring solo funcionará si se colocan los values = { }

    // Leer lo que el usuario escribe
    const handleChange = (e) => {

        guardarBusqueda({
            ...busqueda, // Siempre necesario una copia del State para almacenar
            [e.target.name] : e.target.value // Almacena nombres y valores
        })

    };

    // Funcion que va a mostrar el error si no se llena el formulario

    function mostrarAlerta (e){
        
        // Impedir la acción por default que es enviarnos al inicio
        e.preventDefault();

        // Validar el formulario
        if (ciudad.trim() === '' || pais.trim() === '') {
            
            guardarError(true)

            

            setTimeout(() => {
                guardarError(false)
            }, 5000);

            return;
        }
        
        // Si se pasa la validación
        guardarError(false)


        // Para que se muestre la API
        guardarConsultar(true)

    };

     

    return ( 

        <form
            onSubmit={mostrarAlerta}
        >
            {error ? <Error 
                mensaje="Todos los campos son obligatorios"
            /> : null }

            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>

            </div>

            <div className="input-field col s12">

                <select
                    name="pais"
                    id="pais"
                    value={pais}

                    onChange={handleChange}
                >

                    <option value="#!">
                        -- Selecciona el País --
                    </option>

                    <option value="PT">Portugal</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    
                </select>

                <label htmlFor="pais">País: </label>
                
            </div>
            
            <div className="input-field col s12"> 
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    
                /> 
            </div>
             
        </form>
    );
}
 
Formulario.propTypes = {
    guardarBusqueda: PropTypes.func.isRequired,
    busqueda: PropTypes.object.isRequired,
    guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;