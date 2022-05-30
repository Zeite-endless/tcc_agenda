import axios from "axios";

const getConnection = (idGoogle: string, signal: any): any => {
    const options = {
        method: 'GET',
        url: 'https://localhost:5001/api/Conexao/RecuperaConexoesPorIdGoogle',
        signal: signal,
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

export default getConnection;