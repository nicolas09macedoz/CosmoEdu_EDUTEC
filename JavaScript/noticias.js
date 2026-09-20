document.addEventListener("DOMContentLoaded", function () {
    const noticias = document.querySelectorAll(".noticia");

    noticias.forEach(function (noticia) {
        const titulo = noticia.querySelector("h3")?.textContent || "Noticia";
        const texto = noticia.querySelector("p:last-child")?.textContent || "";

        noticia.tabIndex = 0;
        noticia.setAttribute("aria-label", `${titulo}. ${texto}`);

        noticia.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                noticia.classList.toggle("selecionada");
            }
        });

        noticia.addEventListener("click", function () {
            noticias.forEach(function (outraNoticia) {
                if (outraNoticia !== noticia) {
                    outraNoticia.classList.remove("selecionada");
                }
            });
            noticia.classList.toggle("selecionada");
        });
    });

    window.addEventListener("scroll", function () {
        document.querySelector("header")?.classList.toggle("rolando", window.scrollY > 20);
    }, { passive: true });
});
