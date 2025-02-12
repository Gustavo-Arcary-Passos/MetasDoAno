const { getRotinas, adicionarRotina, removerRotina } = require('./rotinaGlobal');

adicionarRotina("Academia", "Treino de musculação", "Diária", (success) => {
    if (success) {
        console.log("Rotina adicionada com sucesso!");
    }
});

getRotinas((rotinas) => {
    console.log("Lista de rotinas:", rotinas);
});

removerRotina("Academia", (success) => {
    if (success) {
        console.log("Rotina removida com sucesso!");
    }
});
