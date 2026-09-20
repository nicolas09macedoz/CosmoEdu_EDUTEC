document.addEventListener("DOMContentLoaded", function () {
    const ano = document.getElementById("ano");
    const imagem = document.querySelector(".inicio-imagem img");
    const secoes = document.querySelectorAll("main section");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (evento) {
            const destino = document.querySelector(link.getAttribute("href"));

            if (!destino) {
                return;
            }

            evento.preventDefault();
            destino.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (!prefersReducedMotion && imagem) {
        imagem.addEventListener("pointermove", function (evento) {
            const area = imagem.getBoundingClientRect();
            const deslocamentoX = ((evento.clientX - area.left) / area.width - 0.5) * 8;
            const deslocamentoY = ((evento.clientY - area.top) / area.height - 0.5) * 8;
            imagem.style.transform = `translate(${deslocamentoX}px, ${deslocamentoY}px) scale(1.02)`;
        });

        imagem.addEventListener("pointerleave", function () {
            imagem.style.transform = "";
        });
    }

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15 });

        secoes.forEach(function (secao) {
            observador.observe(secao);
        });
    }
});
