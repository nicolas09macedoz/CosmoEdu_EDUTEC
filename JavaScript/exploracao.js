document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".conquistas > div");
    const titulo = document.querySelector(".titulo");

    cards.forEach(function (card) {
        card.tabIndex = 0;
        card.setAttribute("aria-label", `${card.querySelector("h3")?.textContent || "Conquista"}: ${card.querySelector("p:last-child")?.textContent || ""}`);
    });

    if ("IntersectionObserver" in window && titulo) {
        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.disconnect();
                }
            });
        }, { threshold: 0.2 });

        observador.observe(titulo);
    }

    window.addEventListener("scroll", function () {
        document.querySelector("header")?.classList.toggle("rolando", window.scrollY > 20);
    }, { passive: true });
});
