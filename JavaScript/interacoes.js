(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const barra = document.createElement("div");
        const caminhoAtual = window.location.pathname.split("/").pop() || "index.html";
        let atualizandoBarra = false;

        const header = document.querySelector("header");
        const navegacao = header ? header.querySelector("nav") : null;

        if (header && navegacao) {
            const menu = document.createElement("button");
            menu.className = "menu-toggle";
            menu.type = "button";
            menu.setAttribute("aria-label", "Abrir menu");
            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-controls", "navegacao-principal");
            menu.innerHTML = '<span class="menu-toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span><span class="menu-toggle-label">Menu</span>';
            navegacao.id = "navegacao-principal";
            header.insertBefore(menu, navegacao);

            function fecharMenu() {
                header.classList.remove("menu-aberto");
                menu.setAttribute("aria-expanded", "false");
                menu.setAttribute("aria-label", "Abrir menu");
            }

            menu.addEventListener("click", function () {
                const aberto = header.classList.toggle("menu-aberto");
                menu.setAttribute("aria-expanded", String(aberto));
                menu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
            });

            navegacao.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", fecharMenu);
            });

            document.addEventListener("keydown", function (evento) {
                if (evento.key === "Escape") {
                    fecharMenu();
                }
            });
        }

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

        document.body.classList.add("pagina-pronta");

        const topo = document.createElement("button");
        topo.className = "botao-topo-global";
        topo.type = "button";
        topo.setAttribute("aria-label", "Voltar ao topo");
        topo.textContent = "↑";
        document.body.appendChild(topo);

        function atualizarTopo() {
            topo.classList.toggle("visivel", window.scrollY > 420);
        }

        window.addEventListener("scroll", atualizarTopo, { passive: true });
        topo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: reduzMovimento ? "auto" : "smooth" });
        });
        atualizarTopo();

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
                const busca = document.querySelector("#busca-site");
                if (busca) {
                    evento.preventDefault();
                    busca.focus();
                }
            }
        });

        if (!reduzMovimento) {
            document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
                link.addEventListener("click", function (evento) {
                    if (evento.defaultPrevented || link.target === "_blank" || evento.metaKey || evento.ctrlKey) return;
                    evento.preventDefault();
                    document.body.classList.add("saindo");
                    window.setTimeout(function () { window.location.href = link.href; }, 220);
                });
            });
        }

        if (reduzMovimento) {
            return;
        }

        document.body.classList.add("animacoes-ativas");

        const superficiesInterativas = document.querySelectorAll(
            ".planeta, .card, .noticia, .filme, .curiosidade, .conquistas > div"
        );

        superficiesInterativas.forEach(function (superficie) {
            const brilho = document.createElement("span");
            brilho.className = "brilho-superficie";
            brilho.setAttribute("aria-hidden", "true");
            superficie.classList.add("efeito-luz");
            superficie.appendChild(brilho);

            superficie.addEventListener("pointermove", function (evento) {
                const area = superficie.getBoundingClientRect();
                const x = (evento.clientX - area.left) / area.width;
                const y = (evento.clientY - area.top) / area.height;
                const rotateY = (x - 0.5) * 10;
                const rotateX = (0.5 - y) * 10;

                superficie.style.setProperty("--luz-x", `${evento.clientX - area.left}px`);
                superficie.style.setProperty("--luz-y", `${evento.clientY - area.top}px`);
                superficie.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
                superficie.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
                superficie.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
            });

            superficie.addEventListener("pointerenter", function () {
                superficie.classList.add("luz-ativa");
            });

            superficie.addEventListener("pointerleave", function () {
                superficie.classList.remove("luz-ativa");
                superficie.style.setProperty("--tilt-x", "0deg");
                superficie.style.setProperty("--tilt-y", "0deg");
                superficie.style.transform = "";
            });
        });

        const elementosAnimados = document.querySelectorAll(
            "main > section, .planeta, .card, .noticia, .filme, .conquistas > div"
        );

        if ("IntersectionObserver" in window) {
            const observadorAnimacoes = new IntersectionObserver(function (entradas, observador) {
                entradas.forEach(function (entrada) {
                    if (!entrada.isIntersecting) {
                        return;
                    }

                    entrada.target.classList.add("revelado");
                    observador.unobserve(entrada.target);
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

            elementosAnimados.forEach(function (elemento, indice) {
                elemento.classList.add("revelar-item");
                elemento.style.setProperty("--atraso-reveal", `${Math.min(indice % 6, 5) * 70}ms`);
                observadorAnimacoes.observe(elemento);
            });
        } else {
            elementosAnimados.forEach(function (elemento) {
                elemento.classList.add("revelado");
            });
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
