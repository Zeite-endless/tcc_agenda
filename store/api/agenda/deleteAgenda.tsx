import axios from "axios";
import ngrok_URL from "../../ngrok";

const deleteAgenda = (idAgenda: string) => {
    const options = {
        method: 'DELETE',
        url: `${ngrok_URL}/api/Agenda/DeletaAgendaPorIdAgenda`,
        headers: {
            'Content-Type': 'application/json',
            idAgenda: idAgenda
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default deleteAgenda