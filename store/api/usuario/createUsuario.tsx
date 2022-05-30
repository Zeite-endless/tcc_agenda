import axios from "axios";
import ngrok_URL from "../../ngrok";

const createUser = (idGoogle: string, email: string, nome: string, foto: string ) => {
    const options = {
        method: 'POST',
        url: `${ngrok_URL}/api/Usuario/AdicionaUsuario`,
        headers: {
            'Content-Type': 'application/json',
            idGoogle: idGoogle,
            email: email,
            nome: nome,
            foto: foto
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default createUser