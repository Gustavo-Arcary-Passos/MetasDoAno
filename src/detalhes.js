function getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
}

document.addEventListener("DOMContentLoaded", function () {
    const typeFreq = getParametro("frequencia")
    document.getElementById("rotinaNome").innerText = getParametro("nome") || "Nome não encontrado";
    document.getElementById("rotinaDescricao").innerText = getParametro("descricao") || "Descrição não encontrada";
    document.getElementById("rotinaFrequencia").innerText = getParametro("frequencia") || "Frequência não encontrada";
    
    if(typeFreq === "Diária")
    {
        generateCalendarDay(2025, 24, 5, "rgb(31,92,97)", "rgb(62,185,195)");
    } else if(typeFreq === "Semanal")
    {
        generateCalendarWeek(2025, 96, 20, "rgb(97,31,92)", "rgb(195,62,185)");
    } else if(typeFreq === "Mensal")
    {
        generateCalendarMonth(96, 20, "rgb(92,97,31)", "rgb(185,195,62)");
    }
});