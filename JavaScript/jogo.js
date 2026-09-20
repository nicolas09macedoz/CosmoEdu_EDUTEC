
document.addEventListener("DOMContentLoaded", function () {

    console.log("CosmoEdu: jogo.js carregado!");

    /* ================================
       ELEMENTOS
    ================================= */

    const canvas = document.getElementById("campo-jogo");
    const botaoIniciar = document.getElementById("iniciar");
    const botaoReiniciar = document.getElementById("reiniciar");

    const telaInicial = document.getElementById("mensagem-jogo");
    const telaFinal = document.getElementById("tela-final");

    const pontosElemento = document.getElementById("pontos");
    const comboElemento = document.getElementById("combo");
    const tempoElemento = document.getElementById("tempo");
    const vidasElemento = document.getElementById("vidas");
    const gameWrapper = document.querySelector(".game-wrapper");
    const feedbackJogo = document.getElementById("feedback-jogo");

    const pontuacaoFinal = document.getElementById("pontuacao-final");
    const asteroidesFinal = document.getElementById("asteroides-final");
    const comboFinal = document.getElementById("combo-final");


    /* ================================
       VERIFICAÇÃO
    ================================= */

    if (!canvas || !botaoIniciar) {
        console.error("Elementos do jogo não encontrados.");
        return;
    }


    /* ================================
       CANVAS
    ================================= */

    const contexto = canvas.getContext("2d");

    let largura = 0;
    let altura = 0;


    /* ================================
       VARIÁVEIS DO JOGO
    ================================= */

    let asteroides = [];
    let estrelas = [];
    let particulas = [];

    let pontos = 0;
    let combo = 1;
    let comboMaximo = 1;

    let vidas = 3;

    let tempo = 45;

    let destruidos = 0;

    let jogoAtivo = false;

    let animacao = null;

    let acumulador = 0;

    let timer = null;

    let inicioTempo = 0;


    /* ================================
       CANVAS
    ================================= */

    function ajustarCanvas() {

        const escala = window.devicePixelRatio || 1;

        largura = canvas.clientWidth;
        altura = canvas.clientHeight;

        canvas.width = Math.max(1, largura * escala);
        canvas.height = Math.max(1, altura * escala);

        contexto.setTransform(
            escala,
            0,
            0,
            escala,
            0,
            0
        );
    }


    /* ================================
       ESTRELAS
    ================================= */

    function criarEstrelas() {

        estrelas = [];

        for (let i = 0; i < 75; i++) {

            estrelas.push({
                x: Math.random() * largura,
                y: Math.random() * altura,
                tamanho: Math.random() * 1.5 + 0.3,
                brilho: Math.random() * 0.8 + 0.2
            });

        }
    }


    /* ================================
       FUNDO
    ================================= */

    function desenharFundo() {

        contexto.fillStyle = "#050810";

        contexto.fillRect(
            0,
            0,
            largura,
            altura
        );

        estrelas.forEach(function (estrela) {

            contexto.globalAlpha = estrela.brilho;

            contexto.fillStyle = "#9da9ff";

            contexto.beginPath();

            contexto.arc(
                estrela.x,
                estrela.y,
                estrela.tamanho,
                0,
                Math.PI * 2
            );

            contexto.fill();

        });

        contexto.globalAlpha = 1;
    }


    /* ================================
       CRIAR ASTEROIDE
    ================================= */

    function criarAsteroide() {

        const tamanho =
            Math.random() * 13 + 10;

        asteroides.push({

            x:
                Math.random() *
                (largura - tamanho * 2) +
                tamanho,

            y: -tamanho,

            tamanho: tamanho,

            velocidade:
                Math.random() * 1.1 + 0.7,

            rotacao:
                Math.random() * Math.PI,

            variacao:
                Math.random() * 1000
        });
    }

    function criarExplosao(x, y, cor) {
        for (let i = 0; i < 16; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const velocidade = Math.random() * 3 + 1;

            particulas.push({
                x: x,
                y: y,
                vx: Math.cos(angulo) * velocidade,
                vy: Math.sin(angulo) * velocidade,
                tamanho: Math.random() * 2.5 + 1,
                vida: 1,
                cor: cor
            });
        }
    }

    function atualizarParticulas(delta) {
        const fator = delta / 16.67;

        particulas = particulas.filter(function (particula) {
            particula.x += particula.vx * fator;
            particula.y += particula.vy * fator;
            particula.vy += 0.035 * fator;
            particula.vida -= 0.035 * fator;
            return particula.vida > 0;
        });
    }

    function desenharParticulas() {
        particulas.forEach(function (particula) {
            contexto.save();
            contexto.globalAlpha = particula.vida;
            contexto.fillStyle = particula.cor;
            contexto.shadowColor = particula.cor;
            contexto.shadowBlur = 10;
            contexto.beginPath();
            contexto.arc(particula.x, particula.y, particula.tamanho, 0, Math.PI * 2);
            contexto.fill();
            contexto.restore();
        });
    }

    function mostrarFeedback(texto) {
        if (!feedbackJogo) {
            return;
        }

        feedbackJogo.textContent = texto;
        feedbackJogo.classList.remove("ativo");
        void feedbackJogo.offsetWidth;
        feedbackJogo.classList.add("ativo");
    }

    function destacarImpacto() {
        if (!gameWrapper) {
            return;
        }

        gameWrapper.classList.remove("impacto");
        void gameWrapper.offsetWidth;
        gameWrapper.classList.add("impacto");
    }


    /* ================================
       DESENHAR ASTEROIDE
    ================================= */

    function desenharAsteroide(asteroide) {

        contexto.save();

        contexto.translate(
            asteroide.x,
            asteroide.y
        );

        contexto.rotate(
            asteroide.rotacao
        );

        contexto.fillStyle = "#182338";

        contexto.strokeStyle = "#71829c";

        contexto.lineWidth = 1.5;

        contexto.beginPath();

        for (let i = 0; i < 8; i++) {

            const angulo =
                (Math.PI * 2 / 8) * i;

            const tamanho =
                asteroide.tamanho *
                (
                    0.78 +
                    Math.sin(
                        asteroide.variacao + i
                    ) * 0.15
                );

            const x =
                Math.cos(angulo) * tamanho;

            const y =
                Math.sin(angulo) * tamanho;

            if (i === 0) {

                contexto.moveTo(x, y);

            } else {

                contexto.lineTo(x, y);
            }
        }

        contexto.closePath();

        contexto.fill();

        contexto.stroke();

        contexto.fillStyle = "#3b4c66";

        contexto.beginPath();

        contexto.arc(
            -asteroide.tamanho * 0.25,
            -asteroide.tamanho * 0.15,
            asteroide.tamanho * 0.15,
            0,
            Math.PI * 2
        );

        contexto.fill();

        contexto.restore();
    }


    /* ================================
       DESENHAR NAVE
    ================================= */

    function desenharNave() {

        const x = largura / 2;

        const y = altura - 28;

        contexto.save();

        contexto.translate(x, y);

        contexto.fillStyle = "#9da9ff";

        contexto.shadowColor = "#9da9ff";

        contexto.shadowBlur = 15;

        contexto.beginPath();

        contexto.moveTo(0, -14);

        contexto.lineTo(9, 10);

        contexto.lineTo(0, 6);

        contexto.lineTo(-9, 10);

        contexto.closePath();

        contexto.fill();

        contexto.shadowBlur = 0;

        contexto.strokeStyle = "#ffffff";

        contexto.stroke();

        contexto.restore();
    }


    /* ================================
       DESENHAR
    ================================= */

    function desenhar() {

        contexto.clearRect(
            0,
            0,
            largura,
            altura
        );

        desenharFundo();

        asteroides.forEach(function (asteroide) {

            desenharAsteroide(asteroide);

        });

        desenharParticulas();

        desenharNave();
    }


    /* ================================
       ATUALIZAR JOGO
    ================================= */

    
function atualizar(delta) {

    if (!jogoAtivo) {
        return;
    }

    atualizarParticulas(delta);


    /* ============================
       CRIAR ASTEROIDES
    ============================ */

    acumulador += delta;

    const intervalo =
        Math.max(
            300,
            850 - (45 - tempo) * 10
        );

    if (acumulador >= intervalo) {

        criarAsteroide();

        acumulador = 0;
    }


    /* ============================
       MOVER ASTEROIDES
    ============================ */

    for (
        let i = asteroides.length - 1;
        i >= 0;
        i--
    ) {

        const asteroide = asteroides[i];

        /* Movimento */

        asteroide.y += asteroide.velocidade;

        asteroide.rotacao += 0.006;


        /* ============================
           LINHA DA NAVE
        ============================ */

        const linhaDaNave = altura - 28;


        /* ============================
           ASTEROIDE PASSOU DA NAVE
        ============================ */

        if (asteroide.y >= linhaDaNave) {

            /*
             * Só agora ele realmente
             * escapou.
             */

            asteroides.splice(i, 1);

            criarExplosao(asteroide.x, asteroide.y, "#ff6b8a");


            /* PERDE UMA VIDA */

            if (vidas > 0) {
                vidas--;
            }


            /* RESET DO COMBO */

            combo = 1;


            /* ATUALIZA HUD */

            atualizarHUD();


            /* GAME OVER */

            if (vidas <= 0) {

                vidas = 0;

                atualizarHUD();

                finalizarJogo(false);

                return;
            }
        }
    }
}




    /* ================================
       LOOP DO JOGO
    ================================= */

    function loop(agora) {

        if (!jogoAtivo) {
            return;
        }

        const delta =
            agora - ultimoFrame;

        ultimoFrame = agora;

        atualizar(delta);

        desenhar();

        if (jogoAtivo) {

            animacao =
                requestAnimationFrame(loop);
        }
    }


    let ultimoFrame = 0;


    /* ================================
       CRONÔMETRO
    ================================= */

    function iniciarCronometro() {

        /* Garante que não exista
           outro cronômetro */

        clearInterval(timer);

        inicioTempo = Date.now();

        tempo = 45;

        atualizarHUD();


        timer = setInterval(function () {

            if (!jogoAtivo) {
                clearInterval(timer);
                return;
            }


            const agora = Date.now();

            const segundosPassados =
                Math.floor(
                    (agora - inicioTempo) / 1000
                );


            tempo =
                45 - segundosPassados;


            if (tempo < 0) {
                tempo = 0;
            }


            atualizarHUD();


            /* TEMPO ACABOU */

            if (tempo <= 0) {

                clearInterval(timer);

                finalizarJogo(true);
            }

        }, 100);
    }


    /* ================================
       INICIAR JOGO
    ================================= */

    function iniciarJogo() {

        /* PARAR QUALQUER JOGO ANTERIOR */

        jogoAtivo = false;

        cancelAnimationFrame(animacao);

        clearInterval(timer);


        /* ============================
           RESET COMPLETO
        ============================ */

        pontos = 0;

        combo = 1;

        comboMaximo = 1;

        vidas = 3;

        tempo = 45;

        destruidos = 0;

        asteroides = [];

        acumulador = 0;


        /* ============================
           ATIVAR
        ============================ */

        jogoAtivo = true;


        /* TELAS */

        telaInicial.style.display = "none";

        telaFinal.style.display = "none";


        /* HUD */

        atualizarHUD();


        /* ============================
           CRONÔMETRO
        ============================ */

        iniciarCronometro();


        /* ============================
           ANIMAÇÃO
        ============================ */

        ultimoFrame =
            performance.now();

        animacao =
            requestAnimationFrame(loop);
    }


    /* ================================
       FINALIZAR JOGO
    ================================= */

    function finalizarJogo(tempoTerminou) {

        /* Evita finalizar duas vezes */

        if (!jogoAtivo) {
            return;
        }


        /* DESATIVA */

        jogoAtivo = false;


        /* PARA TUDO */

        cancelAnimationFrame(animacao);

        clearInterval(timer);

        timer = null;


        /* CORRIGE VALORES */

        if (tempo < 0) {
            tempo = 0;
        }

        if (vidas < 0) {
            vidas = 0;
        }


        atualizarHUD();


        /* RESULTADO */

        if (pontuacaoFinal) {

            pontuacaoFinal.textContent =
                String(pontos).padStart(4, "0");
        }


        if (asteroidesFinal) {

            asteroidesFinal.textContent =
                destruidos;
        }


        if (comboFinal) {

            comboFinal.textContent =
                "x" + comboMaximo;
        }


        /* MOSTRAR TELA FINAL */

        telaFinal.style.display = "flex";


        desenhar();
    }


    /* ================================
       HUD
    ================================= */

    function atualizarHUD() {

        /* PONTOS */

        if (pontosElemento) {

            pontosElemento.textContent =
                String(pontos).padStart(4, "0");
        }


        /* COMBO */

        if (comboElemento) {

            comboElemento.textContent =
                "x" + combo;
        }


        /* TEMPO */

        if (tempoElemento) {

            tempoElemento.textContent =
                String(Math.max(0, tempo));
        }


        /* VIDAS */

        if (vidasElemento) {

            if (vidas >= 3) {

                vidasElemento.textContent =
                    "♥ ♥ ♥";

            } else if (vidas === 2) {

                vidasElemento.textContent =
                    "♥ ♥ ♡";

            } else if (vidas === 1) {

                vidasElemento.textContent =
                    "♥ ♡ ♡";

            } else {

                vidasElemento.textContent =
                    "♡ ♡ ♡";
            }
        }
    }


    /* ================================
       CLIQUE
    ================================= */

    function clicarNoCanvas(evento) {

        if (!jogoAtivo) {
            return;
        }


        const rect =
            canvas.getBoundingClientRect();


        const escalaX =
            largura / rect.width;

        const escalaY =
            altura / rect.height;


        const x =
            (evento.clientX - rect.left) *
            escalaX;

        const y =
            (evento.clientY - rect.top) *
            escalaY;


        /* PROCURA ASTEROIDE */

        for (
            let i = asteroides.length - 1;
            i >= 0;
            i--
        ) {

            const asteroide =
                asteroides[i];


            const distancia =
                Math.sqrt(
                    Math.pow(
                        x - asteroide.x,
                        2
                    ) +
                    Math.pow(
                        y - asteroide.y,
                        2
                    )
                );


            if (
                distancia <=
                asteroide.tamanho + 8
            ) {

                /* REMOVE ASTEROIDE */

                asteroides.splice(i, 1);

                criarExplosao(asteroide.x, asteroide.y, "#8fd7ff");
                destacarImpacto();


                /* ========================
                   PONTUAÇÃO
                ======================== */

                const pontosGanhos =
                    10 * combo;

                pontos +=
                    pontosGanhos;


                destruidos++;


                /* ========================
                   COMBO
                ======================== */

                combo++;


                if (
                    combo >
                    comboMaximo
                ) {

                    comboMaximo =
                        combo;
                }


                if (combo > 10) {

                    combo = 10;
                }


                atualizarHUD();
                mostrarFeedback(combo > 2 ? "COMBO x" + combo : "+" + pontosGanhos);

                return;
            }
        }


        /* CLIQUE ERRADO */

        combo = 1;

        atualizarHUD();
    }


    /* ================================
       BOTÃO INICIAR
    ================================= */

    botaoIniciar.addEventListener(
        "click",
        iniciarJogo
    );


    /* ================================
       BOTÃO REINICIAR
    ================================= */

    if (botaoReiniciar) {

        botaoReiniciar.addEventListener(
            "click",
            iniciarJogo
        );
    }


    /* ================================
       CLIQUE NO CANVAS
    ================================= */

    canvas.addEventListener(
        "click",
        clicarNoCanvas
    );


    /* ================================
       RESIZE
    ================================= */

    window.addEventListener(
        "resize",
        function () {

            ajustarCanvas();

            criarEstrelas();


            if (!jogoAtivo) {

                desenhar();
            }
        }
    );


    /* ================================
       INICIALIZAÇÃO
    ================================= */

    ajustarCanvas();

    criarEstrelas();

    atualizarHUD();

    desenhar();

});

