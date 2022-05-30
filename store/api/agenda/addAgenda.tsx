import axios from "axios";
import ngrok_URL from "../../ngrok";

const addAgenda = (idUsuario: string, idGoogle: string, email: string, nome: string, titulo: string, descricao: string, dt_Fim: string ) => {
    const options = {
        method: 'POST',
        url: `${ngrok_URL}/api/Agenda/AdicionaAgenda`,
        headers: {
            'Content-Type': 'application/json',
            idUsuario: idUsuario,
            idGoogle: idGoogle,
            email: email,
            nome: nome
        },
        data: { titulo: titulo, descricao: descricao, dt_Fim: dt_Fim }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default addAgenda