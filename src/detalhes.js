function getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
}

document.addEventListener("DOMContentLoaded", async function () {
    const typeFreq = getParametro("frequencia");
    const rotinaNome = getParametro("nome");


    console.log("Nome da rotina:", rotinaNome);

    document.getElementById("rotinaNome").innerText = rotinaNome || "Nome não encontrado";
    document.getElementById("rotinaDescricao").innerText = getParametro("descricao") || "Descrição não encontrada";
    document.getElementById("rotinaFrequencia").innerText = typeFreq || "Frequência não encontrada";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "tarefaCheckbox";
    checkbox.classList.add("tarefa-checkbox");

    let label = document.createElement("label");
    label.setAttribute("for", "tarefaCheckbox");
    label.textContent = "Edit";
    
    let container = document.getElementById("tarefaCheckboxContainer");
    container.appendChild(label);
    container.appendChild(checkbox);

    let data = await window.api.getRotinaDatas(rotinaNome);
    
    if (typeFreq === "Diária") {
        let dayCheckedRotinas = await window.api.groupDatesBy(data, 'day');
        generateCalendarDay(2025, 24, 5, "rgb(31,92,97)", "rgb(62,185,195)", dayCheckedRotinas);
    } else if (typeFreq === "Semanal") {
        let weekCheckedRotinas = await window.api.groupDatesBy(data, 'week');
        generateCalendarWeek(2025, 96, 20, "rgb(97,31,92)", "rgb(195,62,185)", weekCheckedRotinas);
    } else if (typeFreq === "Mensal") {
        let monthCheckedRotinas = await window.api.groupDatesBy(data, 'month');
        generateCalendarMonth(96, 20, "rgb(92,97,31)", "rgb(185,195,62)", monthCheckedRotinas);
    }
});