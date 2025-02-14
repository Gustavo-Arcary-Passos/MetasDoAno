let listaRotinas = document.getElementById("listaTarefas");

async function carregarRotinas() {
    listaRotinas.innerHTML = "";
    
    let rotinas = await window.api.getRotinas(); 
    let dataHoje = await window.api.day();
    
    let rotinasChecked = await window.api.getRotinaHoje(dataHoje);
    let nomesRotinasChecked = new Set(rotinasChecked.map(r => r.nome));

    rotinas.forEach(rotina => {
        let estaMarcada = nomesRotinasChecked.has(rotina.nome);
        
        let rotinaObj = new Rotina(rotina.nome, rotina.description, rotina.frequency, estaMarcada);
        listaRotinas.appendChild(rotinaObj.showTarefaInfo());
    });
}

async function atualizarRotinasChecadas(rotinas, dataHoje) {
    let jaChecada = await window.api.getRotinaHoje(dataHoje);
    let nomesRotinasChecked = new Set(jaChecada.map(r => r.nome));
    console.log('Rotinas checadas no banco:', jaChecada);
    
    for (let rotina of rotinas) {
        let estaMarcada = rotina.checked;
        
        console.log(`Rotina: ${rotina.nome}, Marcada: ${estaMarcada}`);
        
        if (estaMarcada && !nomesRotinasChecked.has(rotina.nome)) {
            console.log(`Adicionando rotina: ${rotina.nome}`);
            const sucesso = await window.api.adicionarRotinaData(rotina.nome, dataHoje);
            if (sucesso) {
                console.log(`Rotina ${rotina.nome} adicionada com sucesso.`);
            } else {
                console.error(`Falha ao adicionar rotina: ${rotina.nome}`);
            }
        }
        
        if (!estaMarcada && nomesRotinasChecked.has(rotina.nome)) {
            console.log(`Removendo rotina: ${rotina.nome}`);
            const sucesso = await window.api.removerRotinaData(rotina.nome, dataHoje);
            if (sucesso) {
                console.log(`Rotina ${rotina.nome} removida com sucesso.`);
            } else {
                console.error(`Falha ao remover rotina: ${rotina.nome}`);
            }
        }
    }
}

let navegarRotina = document.getElementById("navegarRotina");

navegarRotina.addEventListener('click', async (event) => {
    event.preventDefault();

    let rotinas = await window.api.getRotinas(); 
    let dataHoje = await window.api.day();  

    let checkboxes = document.querySelectorAll(".tarefa-checkbox");
    
    let rotinasAtualizadas = rotinas.map((rotina, index) => {
        let estaMarcada = checkboxes[index].checked;
        return new Rotina(rotina.nome, rotina.description, rotina.frequency, estaMarcada);
    });

    await atualizarRotinasChecadas(rotinasAtualizadas, dataHoje);

    window.location.href = "rotina.html";
});

carregarRotinas();