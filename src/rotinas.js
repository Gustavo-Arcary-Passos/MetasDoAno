// let rotinas = [
//     new Rotina("Academia", "Treino de musculação", "Diária"),
//     new Rotina("Estudos", "Ler um capítulo de um livro", "Semanal"),
//     new Rotina("Lazer", "Assistir um filme", "Mensal")
// ];

// let listaRotinas = document.getElementById("listaRotinas");

// rotinas.forEach(rotina => {
//     listaRotinas.appendChild(rotina.showRotinaCompleta(rotinas,listaRotinas));
// });
let listaRotinas = document.getElementById("listaRotinas");

async function carregarRotinas() {
    listaRotinas.innerHTML = ""; // Limpa a lista antes de recarregar os itens
    let rotinas = await window.api.getRotinas();

    rotinas.forEach(rotina => {
        let rotinaObj = new Rotina(rotina.nome, rotina.description, rotina.frequency);
        listaRotinas.appendChild(rotinaObj.showRotinaCompleta());
    });
}

carregarRotinas();
