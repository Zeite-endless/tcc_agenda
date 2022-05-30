import axios from "axios";
import ngrok_URL from "../../ngrok";

const getSolicitacao = (idGoogle: string, signal: any): any => {
    const options = {
        method: 'GET',
        url: `${ngrok_URL}/api/Conexao/RecuperaConexoesPorIdGoogle`,
        signal: signal,
        headers: {
            'Content-Type': 'application/json',
            idGoogleSolicitado: idGoogle
        }
    };

    axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}

export default getSolicitacao