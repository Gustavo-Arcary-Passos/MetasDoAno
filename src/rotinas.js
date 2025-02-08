let rotinas = [
    new Rotina("Academia", "Treino de musculação", "Diária"),
    new Rotina("Estudos", "Ler um capítulo de um livro", "Semanal"),
    new Rotina("Lazer", "Assistir um filme", "Mensal")
];

let listaRotinas = document.getElementById("listaRotinas");

rotinas.forEach(rotina => {
    listaRotinas.appendChild(rotina.showRotinaCompleta());
});
