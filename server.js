const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importa o pacote CORS

// Criação do servidor Express
const app = express();

// Habilitar CORS para permitir requisições de diferentes origens
app.use(cors());  // Permite todas as origens (por padrão)

// Middleware para interpretar o corpo da requisição como JSON
app.use(bodyParser.json());

// Endpoint para consultar a API do Datajud
app.post('/consulta', async (req, res) => {
    // Dados recebidos do frontend (agora buscando pelo número do processo)
    const { numeroProcesso } = req.body;

    // Configuração da requisição à API Datajud
    const url = "https://api-publica.datajud.cnj.jus.br/api_publica_trt20/_search";
    const payload = {
        query: {
            bool: {
                must: [
                    { match: { "numeroProcesso": numeroProcesso } }  // Filtrando pelo número do processo
                ]
            }
        }
    };

    const headers = {
        'Authorization': 'APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==',
        'Content-Type': 'application/json'
    };

    try {
        // Fazendo a requisição POST para a API Datajud
        const response = await axios.post(url, payload, { headers });

        // Retorna os dados da API para o frontend
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao consultar a API Datajud:', error);
        res.status(500).json({ error: 'Erro ao consultar a API' });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
