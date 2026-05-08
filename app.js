// ⚠️ ATENÇÃO: Coloque a sua chave de API do Google AI Studio aqui dentro das aspas!
const API_KEY = "Api-Key";

// =========================
// 🌐 SUAS FONTES + YOUTUBE ATUALIZADOS
// =========================
const fontesMap = {
    matematica: [
        { nome: "📺 Giz com Giz", site: "www.youtube.com/results?search_query=Giz+com+Giz+Matematica+" },
        { nome: "📺 Professor Ferretto", site: "www.youtube.com/results?search_query=Ferretto+Matematica+" },
        { nome: "📺 Marcos Aba Matemática", site: "www.youtube.com/results?search_query=Marcos+Aba+Matematica+" },
        { nome: "🌐 Brasil Escola", site: "brasilescola.uol.com.br/matematica" }
    ],
    geografia: [
        { nome: "📺 Descomplica", site: "www.youtube.com/results?search_query=Descomplica+Geografia+" },
        { nome: "📺 Geografia Irada", site: "www.youtube.com/results?search_query=Geografia+Irada+" },
        { nome: "🌐 IBGE Educa", site: "educa.ibge.gov.br" },
        { nome: "🌐 Toda Matéria", site: "todamateria.com.br/geografia" }
    ],
    historia: [
        { nome: "📺 Descomplica", site: "www.youtube.com/results?search_query=Descomplica+Historia+" },
        { nome: "📺 Nerdologia (História)", site: "www.youtube.com/results?search_query=Nerdologia+Historia+" },
        { nome: "📺 Canal Nostalgia", site: "www.youtube.com/results?search_query=Canal+Nostalgia+Historia+" },
        { nome: "🌐 Só História", site: "sohistoria.com.br" }
    ],
    ciencia: [
        { nome: "📺 Manual do Mundo", site: "www.youtube.com/results?search_query=Manual+do+Mundo+" },
        { nome: "📺 Descomplica", site: "www.youtube.com/results?search_query=Descomplica+Ciencia+" },
        { nome: "📺 Ciência Todo Dia", site: "www.youtube.com/results?search_query=Ciencia+Todo+Dia+" },
        { nome: "📺 Space Today", site: "www.youtube.com/results?search_query=Space+Today+" }
    ],
    portugues: [
        { nome: "📺 Professor Noslen", site: "www.youtube.com/results?search_query=Professor+Noslen+" },
        { nome: "📺 Redação e Gramática Zica", site: "www.youtube.com/results?search_query=Redacao+e+Gramatica+Zica+" },
        { nome: "🌐 Dicio (Dicionário)", site: "dicio.com.br" }
    ],
    tecnologia: [
        { nome: "📺 Código Fonte TV", site: "www.youtube.com/results?search_query=Codigo+Fonte+TV+" },
        { nome: "📺 Filipe Deschamps", site: "www.youtube.com/results?search_query=Filipe+Deschamps+" },
        { nome: "🌐 Canaltech", site: "canaltech.com.br" }
    ],
    saude: [
        { nome: "📺 Drauzio Varella", site: "www.youtube.com/results?search_query=Drauzio+Varella+" },
        { nome: "🌐 Tua Saúde", site: "tuasaude.com" },
        { nome: "🌐 Ministério da Saúde", site: "gov.br/saude" }
    ],
    esportes: [
        { nome: "📺 TNT Sports BR", site: "www.youtube.com/results?search_query=TNT+Sports+Brasil+" },
        { nome: "🌐 Globo Esporte (GE)", site: "ge.globo.com" },
        { nome: "🌐 ESPN Brasil", site: "espn.com.br" }
    ],
    noticias: [
        { nome: "🌐 G1", site: "g1.globo.com" },
        { nome: "🌐 BBC News Brasil", site: "bbc.com/portuguese" },
        { nome: "🔍 Agência Lupa (Fatos)", site: "lupa.uol.com.br" }
    ],
    curiosidades: [
        { nome: "📺 Manual do Mundo", site: "www.youtube.com/results?search_query=Manual+do+Mundo+" },
        { nome: "📺 Você Sabia?", site: "www.youtube.com/results?search_query=Voce+Sabia+" },
        { nome: "📺 Fatos Desconhecidos", site: "www.youtube.com/results?search_query=Fatos+Desconhecidos+" },
        { nome: "🌐 Guinness World Records", site: "guinnessworldrecords.com" }
    ],
    religiao: [
        { nome: "🌐 Vatican News", site: "vaticannews.va" },
        { nome: "🌐 Gospel Prime", site: "gospelprime.com.br" }
    ],
    geral: [
        { nome: "📺 Canal Futura", site: "www.youtube.com/results?search_query=Canal+Futura+" },
        { nome: "🏛️ Portal Gov.br (Oficial)", site: "gov.br" }
    ]
};

const nomes = {
    matematica: "📚 Matemática",
    noticias: "📰 Notícias & Fatos",
    curiosidades: "😲 Curiosidades",
    historia: "🏛️ História",
    religiao: "✝️ Religião",
    ciencia: "🔬 Ciência",
    saude: "🩺 Saúde",
    tecnologia: "💻 Tecnologia",
    geografia: "🌍 Geografia",
    portugues: "✍️ Português",
    esportes: "⚽ Esportes",
    geral: "🌐 Assuntos Gerais"
};

// =========================
// 🧠 FUNÇÃO PRINCIPAL (CONEXÃO COM A IA)
// =========================
async function buscar() {
    let texto = document.getElementById("pesquisa").value;

    if (texto.trim() === "") {
        alert("Digite algo para pesquisar!");
        return;
    }

    document.getElementById("meuContainer").classList.add("active");
    document.getElementById("resultado").innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #2e8b57;">🤖 A IA está analisando sua pesquisa...</h3>
            <p>Verificando o contexto e procurando sinais de fake news...</p>
        </div>
    `;

    try {
        const prompt = `Você é uma IA de um sistema chamado "Safe Search" que combate fake news.
        Analise esta pesquisa do usuário: "${texto}".
        
        Sua tarefa é retornar APENAS um objeto JSON válido contendo exatamente estas 4 chaves:
        1. "categoria": Escolha apenas UMA destas opções (matematica, noticias, historia, ciencia, saude, tecnologia, geografia, portugues, esportes, religiao, curiosidades, geral).
        2. "nivelSuspeita": Um número de 0 a 3 (0 = busca normal/segura, 1 = um pouco estranho/exagerado, 2 = muito suspeito, 3 = alta chance de fake news ou impossível).
        3. "motivo": Uma frase curta (máximo 10 palavras) explicando o nível de suspeita escolhido.
        4. "resultadoMatematica": SE a pesquisa for uma conta matemática clara, resolva e coloque a resposta aqui. ATENÇÃO: no formato brasileiro, o símbolo "." (ponto) significa MULTIPLICAÇÃO, e o símbolo ":" (dois pontos) significa DIVISÃO. Considere também + (soma), - (subtração), * (multiplicação), / (divisão) e ^ (potência). Caso NÃO seja uma conta matemática, coloque null.`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY.trim()}`;

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
            console.error("🚨 Erro na resposta do Google:", data);
            throw new Error(data.error?.message || "Erro na comunicação com a IA.");
        }

        let textoIA = data.candidates[0].content.parts[0].text;
        const respostaIA = JSON.parse(textoIA);

        exibirResultadosIA(respostaIA, texto);

    } catch (erroSistema) {
        console.error("Erro capturado:", erroSistema);
        document.getElementById("resultado").innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: red;">⚠️ Ocorreu um erro!</h3>
                <p>${erroSistema.message}</p>
            </div>
        `;
    }
}

// =========================
// 🎨 EXIBINDO OS DADOS NA TELA
// =========================
function exibirResultadosIA(dadosIA, textoPesquisa) {
    let categoriaFinal = dadosIA.categoria;
    let nivelSuspeita = dadosIA.nivelSuspeita;
    let motivo = dadosIA.motivo;
    let respostaMatematica = dadosIA.resultadoMatematica;

    if (!fontesMap[categoriaFinal]) {
        categoriaFinal = "geral";
    }

    let fontes = fontesMap[categoriaFinal];

    let alerta = "✅ Parece uma busca comum e segura";
    let corAlerta = "#2e8b57";

    if (nivelSuspeita >= 3) {
        alerta = "🚨 ALTA CHANCE DE FAKE NEWS OU IMPOSSÍVEL";
        corAlerta = "#d32f2f";
    } else if (nivelSuspeita === 2) {
        alerta = "⚠️ Suspeito / Exagerado";
        corAlerta = "#f57c00";
    } else if (nivelSuspeita === 1) {
        alerta = "🔍 Bom verificar as fontes com atenção";
        corAlerta = "#fbc02d";
    }

    let html = `
        <h2>${nomes[categoriaFinal]}</h2>
        <p style="color: ${corAlerta}; font-size: 16px; margin: 5px 0;"><strong>Status:</strong> ${alerta}</p>
        <p style="color: #555; margin: 5px 0;"><strong>Análise da IA:</strong> ${motivo}</p>
        <hr style="margin: 15px 0; border: 1px solid #ddd;">
    `;

    if (respostaMatematica && respostaMatematica !== "null") {
        html += `
            <div class="card" style="border-left: 5px solid #007bff; background-color: #f0f8ff;">
                <h3 style="color: #007bff; margin-bottom: 5px;">🧮 Calculadora Inteligente</h3>
                <p style="font-size: 22px; font-weight: bold; color: #222; margin: 0;">Resposta: ${respostaMatematica}</p>
            </div>
        `;
    }

    html += `<p>🔎 <strong>Busque direto nos especialistas recomendados:</strong></p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
    `;

    fontes.forEach(fonte => {
        let url;
        if (fonte.site.includes("youtube.com/results")) {
            url = `https://${fonte.site}${encodeURIComponent(textoPesquisa)}`;
        } else {
            url = `https://www.google.com/search?q=site:${fonte.site}+${encodeURIComponent(textoPesquisa)}`;
        }

        html += `
            <div class="card">
                <h3>${fonte.nome}</h3>
                <a href="${url}" target="_blank">
                    Abrir Resultado 🚀
                </a>
            </div>
        `;
    });

    html += `</div>`;
    document.getElementById("resultado").innerHTML = html;
}
