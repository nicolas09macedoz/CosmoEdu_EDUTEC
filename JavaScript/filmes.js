document.addEventListener("DOMContentLoaded", function () {
    const filmes = document.querySelectorAll(".filme");

    filmes.forEach(function (filme) {
        const titulo = filme.querySelector("h3")?.textContent || "Filme";
        const descricao = filme.querySelector("p")?.textContent || "";

        filme.tabIndex = 0;
        filme.setAttribute("aria-label", `${titulo}. ${descricao}`);

        filme.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                filme.classList.toggle("selecionado");
            }
        });

        filme.addEventListener("click", function () {
            filmes.forEach(function (outroFilme) {
                if (outroFilme !== filme) {
                    outroFilme.classList.remove("selecionado");
                }
            });
            filme.classList.toggle("selecionado");
        });
    });

    window.addEventListener("scroll", function () {
        document.querySelector("header")?.classList.toggle("rolando", window.scrollY > 20);
    }, { passive: true });
});
