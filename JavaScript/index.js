document.addEventListener("DOMContentLoaded", function () {




const header = document.querySelector("header");
const imagem = document.querySelector(".inicio-imagem img");
const botao = document.querySelector(".botao");
const curiosidades = document.querySelectorAll(".curiosidade");
const secoes = document.querySelectorAll("section");
const ano = document.querySelector("#ano");




if (ano) {
    ano.textContent = new Date().getFullYear();
}




window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {
        header.classList.add("rolando");
    } else {
        header.classList.remove("rolando");
    }

});




if (imagem) {

    imagem.addEventListener("mouseenter", function () {
        imagem.classList.add("aproximar");
    });

    imagem.addEventListener("mouseleave", function () {
        imagem.classList.remove("aproximar");
    });

}




if (botao) {

    botao.addEventListener("mouseenter", function () {
        botao.classList.add("ativo");
    });

    botao.addEventListener("mouseleave", function () {
        botao.classList.remove("ativo");
    });

}




curiosidades.forEach(function (curiosidade, indice) {

    curiosidade.style.animationDelay = (indice * 0.1) + "s";

    curiosidade.addEventListener("click", function () {

        curiosidades.forEach(function (item) {
            item.classList.remove("selecionada");
        });

        curiosidade.classList.add("selecionada");

    });

});




const observador = new IntersectionObserver(function (elementos) {

    elementos.forEach(function (elemento) {

        if (elemento.isIntersecting) {

            elemento.target.classList.add("visivel");

        }

    });

}, {
    threshold: 0.15
});


secoes.forEach(function (secao) {
    observador.observe(secao);
});




const botaoTopo = document.createElement("button");

botaoTopo.textContent = "↑";
botaoTopo.title = "Voltar ao topo";
botaoTopo.className = "botao-topo";

document.body.appendChild(botaoTopo);


window.addEventListener("scroll", function () {

    if (window.scrollY > 450) {
        botaoTopo.classList.add("visivel");
    } else {
        botaoTopo.classList.remove("visivel");
    }

});


botaoTopo.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});




const links = document.querySelectorAll("nav a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        links.forEach(function (item) {
            item.classList.remove("clicado");
        });

        link.classList.add("clicado");

    });

});


});
