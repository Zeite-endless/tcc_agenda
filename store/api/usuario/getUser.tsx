import axios from "axios";
import ngrok_URL from "../../ngrok";

const getUser = (email: string) => {
    const options = {
        method: 'GET',
        url: `${ngrok_URL}/api/Usuario/ProcuraUsuario`,
        headers: {
            'Content-Type': 'application/json',
            email: email
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export default getUser