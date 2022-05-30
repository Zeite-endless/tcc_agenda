import axios from "axios";
import ngrok_URL from "../../ngrok";

const solicitarConexao = (idGoogle: string, nomeSolicitante: string, emailSolicitante: string, idSolicitado: string ) => {
    const options = {
        method: 'POST',
        url: `${ngrok_URL}/api/Conexao/SolicitaConexao`,
        headers: {
            'Content-Type': 'application/json',
            idGoogleSolicitante: idGoogle,
            nomeSolicitante: nomeSolicitante
        },
        data: { id_Google_Solicitado_FK: idSolicitado, email_Solicitado_FK: emailSolicitante }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default solicitarConexao