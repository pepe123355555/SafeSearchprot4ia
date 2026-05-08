const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Permite que o seu HTML converse com este servidor
app.use(express.json());

// O guichê de atendimento: recebe o texto do HTML e repassa pra IA
app.post('/api/buscar', async (req, res) => {
    try {
        const textoDoUsuario = req.body.texto;

        // O prompt gigante agora fica escondido no Back-End!
        const prompt = `Você é uma IA de um sistema chamado "Safe Search" que combate fake news.
        Analise esta pesquisa do usuário: "${textoDoUsuario}".
        
        Sua tarefa é retornar APENAS um objeto JSON válido contendo exatamente estas 4 chaves:
        1. "categoria": Escolha apenas UMA destas opções (matematica, noticias, historia, ciencia, saude, tecnologia, geografia, portugues, esportes, religiao, curiosidades, geral).
        2. "nivelSuspeita": Um número de 0 a 3 (0 = normal, 1 = exagerado, 2 = suspeito, 3 = fake news/impossível).
        3. "motivo": Uma frase curta (máximo 10 palavras) explicando o nível.
        4. "resultadoMatematica": SE a pesquisa for uma conta matemática clara, resolva e coloque a resposta aqui. ATENÇÃO: no formato brasileiro, o símbolo "." (ponto) significa MULTIPLICAÇÃO, e ":" (dois pontos) significa DIVISÃO. Considere também + (soma), - (subtração), * (multiplicação), / (divisão) e ^ (potência). Caso NÃO seja uma conta matemática, coloque null.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Erro no Google");
        }

        let textoIA = data.candidates[0].content.parts[0].text;

        // Manda a resposta limpinha de volta pro seu Front-End
        res.json(JSON.parse(textoIA));

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.status(500).json({ erro: error.message });
    }
});

// Ligando o servidor
app.listen(3000, () => {
    console.log("🚀 Servidor Back-End do Safe Search rodando na porta 3000!");
});