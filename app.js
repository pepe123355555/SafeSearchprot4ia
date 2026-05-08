// =========================
// 🌐 SUAS FONTES + YOUTUBE
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
// 🧠 FUNÇÃO PRINCIPAL (CONECTADA AO SEU SERVIDOR)
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
        // 👇 Agora o seu Front-End manda a pesquisa para o SEU servidor Node.js!
        const response = await fetch("http://localhost:3000/api/buscar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texto: texto })
        });

        const dadosIA = await response.json();

        // Se o servidor avisar que deu erro, a gente joga pro catch lá embaixo
        if (!response.ok) {
            throw new Error(dadosIA.erro || "Erro na comunicação com o servidor.");
        }

        // Se deu tudo certo, manda exibir na tela!
        exibirResultadosIA(dadosIA, texto);

    } catch (erroSistema) {
        console.error("Erro capturado:", erroSistema);
        document.getElementById("resultado").innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: red;">⚠️ Ocorreu um erro!</h3>
                <p>Verifique se o seu servidor Node.js está rodando no terminal (digite "node server.js").</p>
                <p style="font-size: 12px; margin-top: 10px;">Detalhe: ${erroSistema.message}</p>
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

    // Se a IA inventar uma categoria, joga pro geral
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

    // Renderiza a Calculadora Inteligente se a IA mandou uma resposta
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

    // Renderiza os botões de link
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