import axios from "axios";
import ngrok_URL from "../../ngrok";

const deleteConnection = (idConexao: string, idGoogleSolicitante: string, idGoogleSolicitado: string ) => {
    const options = {
        method: 'DELETE',
        url: `${ngrok_URL}/api/Conexao/SolicitaConexao`,
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

export default deleteConnection