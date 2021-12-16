import styled from "@emotion/styled";
import PropTypes from "prop-types";

const ContenedorError = styled.div`
    background-color: red;
    border-radius: 1rem;
    padding: .5rem;
    margin-bottom: 2rem;
    color: white;
    font-weight: bold;
    text-align: center;
    border: none;
`;


const Error = ({mensaje}) => {
    return ( 
        <ContenedorError>

            <p>{mensaje}</p>

        </ContenedorError>
        

    );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;