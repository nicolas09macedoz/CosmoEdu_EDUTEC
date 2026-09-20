document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        card.tabIndex = 0;
        card.setAttribute("aria-pressed", "false");

        function alternar() {
            const selecionado = card.classList.toggle("selecionado");
            card.setAttribute("aria-pressed", String(selecionado));
        }

        card.addEventListener("click", alternar);
        card.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                alternar();
            }
        });
    });

    window.addEventListener("scroll", function () {
        document.querySelector("header")?.classList.toggle("rolando", window.scrollY > 20);
    }, { passive: true });
});
