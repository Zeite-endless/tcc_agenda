import axios from "axios";
import ngrok_URL from "../../ngrok";

const solicitarAgenda = (idGoogle: string): any => {
    const options = {
        method: 'GET',
        url: `${ngrok_URL}/api/Agenda/RecuperaAgendaPorIdGoogle`,
        headers: {
            'Content-Type': 'application/json',
            idGoogle: idGoogle
        }
    };

    axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
}

export default solicitarAgenda;