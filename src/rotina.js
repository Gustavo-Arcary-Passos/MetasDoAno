
class Rotina {
    constructor(nome, description, frequency) {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
    }

    criarElemento() {
        let div = document.createElement("div");
        div.classList.add("rotina");

        div.innerHTML = `
            <h3>${this.nome}</h3>
            <p><strong>Descrição:</strong> ${this.description}</p>
            <p><strong>Frequência:</strong> ${this.frequency}</p>
        `;

        return div;
    }
}

let rotinas = [
    new Rotina("Academia", "Treino de musculação", "Diária"),
    new Rotina("Estudos", "Ler um capítulo de um livro", "Semanal"),
    new Rotina("Lazer", "Assistir um filme", "Mensal")
];

let listaRotinas = document.getElementById("listaRotinas");

rotinas.forEach(rotina => {
    listaRotinas.appendChild(rotina.criarElemento());
});
