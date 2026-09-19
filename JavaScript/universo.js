document.addEventListener("DOMContentLoaded", function () {


console.log("Sistema Solar funcionando!");

const planetas = document.querySelectorAll(".planeta");

const dados = {
    mercurio: {
        nome: "Mercúrio",
        numero: "01 / PLANETA",
        tipo: "Planeta rochoso",
        diametro: "4.879 km",
        ano: "88 dias",
        texto: "Mercúrio é o planeta mais próximo do Sol e também o menor planeta do Sistema Solar."
    },

    venus: {
        nome: "Vênus",
        numero: "02 / PLANETA",
        tipo: "Planeta rochoso",
        diametro: "12.104 km",
        ano: "225 dias",
        texto: "Vênus possui uma atmosfera muito densa e é o planeta mais quente do Sistema Solar."
    },

    terra: {
        nome: "Terra",
        numero: "03 / PLANETA",
        tipo: "Planeta rochoso",
        diametro: "12.742 km",
        ano: "365 dias",
        texto: "A Terra é o nosso planeta e possui água líquida em sua superfície. É o único planeta conhecido onde existe vida."
    },

    marte: {
        nome: "Marte",
        numero: "04 / PLANETA",
        tipo: "Planeta rochoso",
        diametro: "6.779 km",
        ano: "687 dias",
        texto: "Marte é conhecido como Planeta Vermelho por causa da presença de óxido de ferro em sua superfície."
    },

    jupiter: {
        nome: "Júpiter",
        numero: "05 / PLANETA",
        tipo: "Gigante gasoso",
        diametro: "139.820 km",
        ano: "11,86 anos",
        texto: "Júpiter é o maior planeta do Sistema Solar e possui uma enorme tempestade conhecida como Grande Mancha Vermelha."
    },

    saturno: {
        nome: "Saturno",
        numero: "06 / PLANETA",
        tipo: "Gigante gasoso",
        diametro: "116.460 km",
        ano: "29,45 anos",
        texto: "Saturno é famoso por seus impressionantes anéis, formados principalmente por partículas de gelo e rocha."
    },

    urano: {
        nome: "Urano",
        numero: "07 / PLANETA",
        tipo: "Gigante de gelo",
        diametro: "50.724 km",
        ano: "84 anos",
        texto: "Urano é um gigante de gelo que possui uma inclinação muito grande, fazendo com que pareça girar de lado."
    },

    netuno: {
        nome: "Netuno",
        numero: "08 / PLANETA",
        tipo: "Gigante de gelo",
        diametro: "49.244 km",
        ano: "164,8 anos",
        texto: "Netuno é o planeta mais distante do Sol e possui alguns dos ventos mais rápidos do Sistema Solar."
    }
};


// ==========================================
// CRIA O MODAL AUTOMATICAMENTE
// ==========================================

const modal = document.createElement("div");

modal.id = "modal-planeta";

modal.innerHTML = `
    <div class="modal-caixa">

        <button class="modal-fechar">×</button>

        <div class="modal-imagem-container">
            <img id="imagem-planeta" src="" alt="">
        </div>

        <div class="modal-info">

            <p id="numero-planeta" class="modal-numero"></p>

            <h2 id="nome-planeta"></h2>

            <p id="descricao-planeta" class="modal-descricao"></p>

            <div class="informacoes-planeta">

                <div>
                    <span>TIPO</span>
                    <strong id="tipo-planeta"></strong>
                </div>

                <div>
                    <span>DIÂMETRO</span>
                    <strong id="diametro-planeta"></strong>
                </div>

                <div>
                    <span>ANO</span>
                    <strong id="ano-planeta"></strong>
                </div>

            </div>

        </div>

    </div>
`;

document.body.appendChild(modal);


// ==========================================
// CSS DO MODAL
// ==========================================

const estilo = document.createElement("style");

estilo.textContent = `

    #modal-planeta {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        background: rgba(2, 4, 12, 0.88);
        backdrop-filter: blur(8px);

        display: none;
        align-items: center;
        justify-content: center;

        z-index: 9999;

        padding: 30px;
    }


    #modal-planeta.aberto {
        display: flex;
    }


    .modal-caixa {
        position: relative;

        width: 850px;
        min-height: 420px;

        display: grid;
        grid-template-columns: 42% 58%;

        background: linear-gradient(
            145deg,
            #111827,
            #080c16
        );

        border: 1px solid #8fd7ff;

        box-shadow:
            0 0 60px rgba(143, 215, 255, 0.15);

        border-radius: 18px;

        overflow: hidden;

        animation: abrirModal 0.3s ease;
    }


    @keyframes abrirModal {

        from {
            opacity: 0;
            transform: translateY(25px) scale(0.96);
        }

        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

    }


    .modal-fechar {
        position: absolute;

        top: 18px;
        right: 20px;

        width: 40px;
        height: 40px;

        border: 1px solid #34485a;
        border-radius: 50%;

        background: rgba(6, 9, 19, 0.8);

        color: white;

        font-size: 27px;
        line-height: 1;

        cursor: pointer;

        z-index: 10;

        transition: 0.2s;
    }


    .modal-fechar:hover {
        background: #8fd7ff;
        color: #060913;
        transform: rotate(90deg);
    }


    .modal-imagem-container {
        height: 100%;
        min-height: 420px;

        background:
            radial-gradient(
                circle,
                rgba(143, 215, 255, 0.12),
                transparent 60%
            );

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 35px;
    }


    #imagem-planeta {
        width: 100%;
        height: 330px;

        object-fit: contain;

        filter:
            drop-shadow(
                0 0 35px
                rgba(143, 215, 255, 0.25)
            );
    }


    .modal-info {
        padding: 55px 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    .modal-numero {
        color: #8fd7ff;
        font-family: "Space Mono", monospace;

        font-size: 12px;

        letter-spacing: 2px;

        margin-bottom: 15px;
    }


    #nome-planeta {
        color: white;

        font-size: 46px;

        margin-bottom: 20px;
    }


    .modal-descricao {
        color: #aab2c7;

        font-size: 16px;

        line-height: 1.7;

        margin-bottom: 35px;
    }


    .informacoes-planeta {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        gap: 12px;
    }


    .informacoes-planeta div {
        padding: 16px;

        background: #0c1420;

        border: 1px solid #203344;

        border-radius: 10px;
    }


    .informacoes-planeta span {
        display: block;

        color: #69788a;

        font-family: "Space Mono", monospace;

        font-size: 9px;

        letter-spacing: 1px;

        margin-bottom: 7px;
    }


    .informacoes-planeta strong {
        color: white;

        font-size: 13px;
    }


    .planeta {
        cursor: pointer;
    }


    .planeta:hover {
        cursor: pointer;
    }

`;

document.head.appendChild(estilo);


// ==========================================
// ELEMENTOS DO MODAL
// ==========================================

const numero = document.getElementById("numero-planeta");
const nome = document.getElementById("nome-planeta");
const descricao = document.getElementById("descricao-planeta");

const tipo = document.getElementById("tipo-planeta");
const diametro = document.getElementById("diametro-planeta");
const ano = document.getElementById("ano-planeta");

const imagem = document.getElementById("imagem-planeta");

const botaoFechar = document.querySelector(".modal-fechar");


// ==========================================
// ABRIR MODAL
// ==========================================

planetas.forEach(function (planeta) {

    planeta.addEventListener("click", function () {

        const nomeData = planeta.getAttribute("data-planeta");

        const planetaInfo = dados[nomeData];

        if (!planetaInfo) {
            console.log("Dados não encontrados para:", nomeData);
            return;
        }


        const imagemOriginal = planeta.querySelector("img");


        numero.textContent = planetaInfo.numero;

        nome.textContent = planetaInfo.nome;

        descricao.textContent = planetaInfo.texto;

        tipo.textContent = planetaInfo.tipo;

        diametro.textContent = planetaInfo.diametro;

        ano.textContent = planetaInfo.ano;


        if (imagemOriginal) {

            imagem.src = imagemOriginal.src;

            imagem.alt = "Imagem do planeta " + planetaInfo.nome;

        }


        modal.classList.add("aberto");

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// FECHAR MODAL
// ==========================================

botaoFechar.addEventListener("click", function () {

    modal.classList.remove("aberto");

    document.body.style.overflow = "";

});


// ==========================================
// CLICAR FORA DO MODAL
// ==========================================

modal.addEventListener("click", function (evento) {

    if (evento.target === modal) {

        modal.classList.remove("aberto");

        document.body.style.overflow = "";

    }

});


// ==========================================
// TECLA ESC
// ==========================================

document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {

        modal.classList.remove("aberto");

        document.body.style.overflow = "";

    }

});


});
