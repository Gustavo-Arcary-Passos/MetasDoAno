let listaRotinas = document.getElementById("listaRotinas");

async function carregarRotinas() {
    listaRotinas.innerHTML = ""; // Limpa a lista antes de recarregar os itens
    let rotinas = await window.api.getRotinas();

    rotinas.forEach(rotina => {
        let rotinaObj = new Rotina(rotina.nome, rotina.description, rotina.frequency);
        listaRotinas.appendChild(rotinaObj.showRotinaCompleta());
    });
}

carregarRotinas();
