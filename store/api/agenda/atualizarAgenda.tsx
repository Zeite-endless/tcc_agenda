import axios from "axios";
import ngrok_URL from "../../ngrok";

const attAgenda = (idAgenda: string, titulo: string, descricao: string, dt_Fim: string) => {
    const options = {
        method: 'PUT',
        url: `${ngrok_URL}/api/Agenda/AtualizaAgendaPorIdAgenda`,
        headers: {
            'Content-Type': 'application/json',
            idAgenda: idAgenda
        },
        data: { titulo: titulo, descricao: descricao, dt_Fim: dt_Fim }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default attAgenda