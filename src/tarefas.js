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