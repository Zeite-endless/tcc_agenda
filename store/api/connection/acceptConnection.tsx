import axios from "axios";
import ngrok_URL from "../../ngrok";

const acceptConnectionID = (idConexao: string, idGoogleSolicitante: string, idGoogleSolicitado: string ) => {
    const options = {
        method: 'PUT',
        url: `${ngrok_URL}/api/Conexao/AceitarConexao`,
        headers: {
            'Content-Type': 'application/json',
            idConexao: idConexao,
            idGoogleSolicitante: idGoogleSolicitante,
            idGoogleSolicitado: idGoogleSolicitado
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default acceptConnectionID