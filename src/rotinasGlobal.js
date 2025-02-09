class Rotina {
    constructor(nome, description, frequency) {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
    }
}

let rotinas = [
    new Rotina("Academia", "Treino de musculação", "Diária"),
    new Rotina("Estudos", "Ler um capítulo de um livro", "Semanal"),
    new Rotina("Lazer", "Assistir um filme", "Mensal")
];

function getRotinas() {
    return rotinas;
}

function adicionarRotina(nome, descricao, frequencia) {
    rotinas.push(new Rotina(nome, descricao, frequencia));
}

function removerRotina(nome) {
    rotinas = rotinas.filter(rotina => rotina.nome !== nome);
}

module.exports = { getRotinas, adicionarRotina, removerRotina };