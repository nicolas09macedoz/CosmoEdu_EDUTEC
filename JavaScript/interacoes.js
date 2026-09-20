(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const barra = document.createElement("div");
        const caminhoAtual = window.location.pathname.split("/").pop() || "index.html";
        let atualizandoBarra = false;

        barra.setAttribute("aria-hidden", "true");
        barra.style.cssText = [
            "position: fixed",
            "top: 0",
            "left: 0",
            "width: 0",
            "height: 2px",
            "z-index: 2000",
            "pointer-events: none",
            "background: linear-gradient(90deg, #8fd7ff, #b2a5ff, #ffffff)",
            "box-shadow: 0 0 12px rgba(143, 215, 255, .8)",
            "transition: width .12s linear"
        ].join(";");
        document.body.appendChild(barra);

        function atualizarProgresso() {
            const documento = document.documentElement;
            const limite = documento.scrollHeight - documento.clientHeight;
            const progresso = limite > 0 ? (window.scrollY / limite) * 100 : 0;
            barra.style.width = `${Math.min(100, Math.max(0, progresso))}%`;
            atualizandoBarra = false;
        }

        window.addEventListener("scroll", function () {
            if (!atualizandoBarra) {
                window.requestAnimationFrame(atualizarProgresso);
                atualizandoBarra = true;
            }
        }, { passive: true });
        atualizarProgresso();

        document.querySelectorAll("header nav a").forEach(function (link) {
            const destino = link.getAttribute("href");
            const corresponde = destino === caminhoAtual || (caminhoAtual === "" && destino === "index.html");

            if (corresponde) {
                link.classList.add("active");
            }
        });

        if (reduzMovimento) {
            return;
        }

        document.querySelectorAll("button, .botao, .ver").forEach(function (controle) {
            controle.addEventListener("pointerdown", function (evento) {
                const ondulacao = document.createElement("span");
                const area = controle.getBoundingClientRect();
                const tamanho = Math.max(area.width, area.height) * 1.5;

                ondulacao.setAttribute("aria-hidden", "true");
                ondulacao.style.cssText = [
                    "position: absolute",
                    "width: " + tamanho + "px",
                    "height: " + tamanho + "px",
                    "left: " + (evento.clientX - area.left - tamanho / 2) + "px",
                    "top: " + (evento.clientY - area.top - tamanho / 2) + "px",
                    "border-radius: 50%",
                    "background: rgba(255, 255, 255, .28)",
                    "pointer-events: none",
                    "transform: scale(0)",
                    "opacity: 1"
                ].join(";");

                if (getComputedStyle(controle).position === "static") {
                    controle.style.position = "relative";
                }

                controle.style.overflow = "hidden";
                controle.appendChild(ondulacao);
                ondulacao.animate([
                    { transform: "scale(0)", opacity: 0.8 },
                    { transform: "scale(1)", opacity: 0 }
                ], { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" }).finished.then(function () {
                    ondulacao.remove();
                });
            });
        });
    });
}());
