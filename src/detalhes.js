function getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rotinaNome").innerText = getParametro("nome") || "Nome não encontrado";
    document.getElementById("rotinaDescricao").innerText = getParametro("descricao") || "Descrição não encontrada";
    document.getElementById("rotinaFrequencia").innerText = getParametro("frequencia") || "Frequência não encontrada";

    generateCalendar(2025, 24, 5, "rgb(31,92,97)", "rgb(62,185,195)");
});