// let rotinas = [
//     new Rotina("Academia", "Treino de musculação", "Diária"),
//     new Rotina("Estudos", "Ler um capítulo de um livro", "Semanal"),
//     new Rotina("Lazer", "Assistir um filme", "Mensal")
// ];

// let listaRotinas = document.getElementById("listaTarefas");

// rotinas.forEach(rotina => {
//     listaRotinas.appendChild(rotina.showTarefaInfo());
// });

let listaRotinas = document.getElementById("listaTarefas");

async function carregarRotinas() {
    listaRotinas.innerHTML = "";
    let rotinas = await window.api.getRotinas();

    rotinas.forEach(rotina => {
        let rotinaObj = new Rotina(rotina.nome, rotina.description, rotina.frequency);
        listaRotinas.appendChild(rotinaObj.showTarefaInfo());
    });
}

carregarRotinas();