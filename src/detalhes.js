function getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
}

document.addEventListener("DOMContentLoaded", function () {
    const typeFreq = getParametro("frequencia");
    const rotinaNome = getParametro("nome");

    // Log para verificar o valor de rotinaNome
    console.log("Nome da rotina:", rotinaNome);

    document.getElementById("rotinaNome").innerText = rotinaNome || "Nome não encontrado";
    document.getElementById("rotinaDescricao").innerText = getParametro("descricao") || "Descrição não encontrada";
    document.getElementById("rotinaFrequencia").innerText = typeFreq || "Frequência não encontrada";

    let data = window.api.getRotinaDatas(rotinaNome); // Passando o nome da rotina

    if (data && data.length > 0) {
        console.log("Datas das atividades realizadas:");
        data.forEach(entry => {
            console.log(`Data: ${entry.data}`);
        });
    } else {
        console.log("Nenhuma data encontrada.");
    }

    if (typeFreq === "Diária") {
        generateCalendarDay(2025, 24, 5, "rgb(31,92,97)", "rgb(62,185,195)");
    } else if (typeFreq === "Semanal") {
        generateCalendarWeek(2025, 96, 20, "rgb(97,31,92)", "rgb(195,62,185)");
    } else if (typeFreq === "Mensal") {
        generateCalendarMonth(96, 20, "rgb(92,97,31)", "rgb(185,195,62)");
    }
});