let listaRotinas = document.getElementById("listaTarefas");

async function carregarRotinas() {
    listaRotinas.innerHTML = "";
    
    let rotinas = await window.api.getRotinas(); 
    let dataHoje = await window.api.day();
    
    let rotinasChecked = await window.api.getRotinaHoje(dataHoje);
    let nomesRotinasChecked = new Set(rotinasChecked.map(r => r.nome));

    rotinas.forEach(async (rotina) => {
        let estaMarcada = nomesRotinasChecked.has(rotina.nome);
        
        let rotinaObj = new Rotina(rotina.nome, rotina.description, rotina.frequency, rotina.color, estaMarcada, dataHoje);
        listaRotinas.appendChild(await rotinaObj.showTarefaInfo());
    });


    let tasksDoneAllDates = await window.api.countAllRotinasAllDays();
    let calendarFormated = await window.api.groupDatesBy(tasksDoneAllDates, 'overview');

    const today = await window.api.today(dataHoje);
    
    generateCalendarAllTasks(2025, 24, 5, rotinas.length, `rgb(255, 0, 0)`,`rgb(0, 255, 0)`, calendarFormated,today);
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
            let sucesso;
            if (rotina.frequency == "Diária") {
                sucesso = await window.api.adicionarRotinaData(rotina.nome, dataHoje);
            } else if (rotina.frequency == "Semanal") {
                // converte o dia de hoje para o dia da semana 
                const dataDomingo = await window.api.getSundayOfWeek(dataHoje);
                sucesso = await window.api.adicionarRotinaData(rotina.nome, dataDomingo);
            } else if (rotina.frequency == "Mensal") {
                // converte o dia de hoje para o primeiro dia do mes
                const dataFirstDayMonth = await window.api.getFirstDayOfMonth(dataHoje);
                sucesso = await window.api.adicionarRotinaData(rotina.nome, dataFirstDayMonth);
            }
            if (sucesso) {
                console.log(`Rotina ${rotina.nome} adicionada com sucesso.`);
            } else {
                console.error(`Falha ao adicionar rotina: ${rotina.nome}`);
            }
        }
        
        if (!estaMarcada && nomesRotinasChecked.has(rotina.nome)) {
            console.log(`Removendo rotina: ${rotina.nome}`);
            let sucesso;
            if (rotina.frequency == "Diária") {
                sucesso = await window.api.removerRotinaData(rotina.nome, dataHoje);
            } else if (rotina.frequency == "Semanal") {
                // converte o dia de hoje para o dia da semana 
                const dataDomingo = await window.api.getSundayOfWeek(dataHoje);
                sucesso = await window.api.removerRotinaData(rotina.nome, dataDomingo);
            } else if (rotina.frequency == "Mensal") {
                // converte o dia de hoje para o primeiro dia do mes
                const dataFirstDayMonth = await window.api.getFirstDayOfMonth(dataHoje);
                sucesso = await window.api.removerRotinaData(rotina.nome, dataFirstDayMonth);
            }
            if (sucesso) {
                console.log(`Rotina ${rotina.nome} removida com sucesso.`);
            } else {
                console.error(`Falha ao remover rotina: ${rotina.nome}`);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let navegarRotina = document.getElementById("navegarRotina");
    
    if (navegarRotina) {
        navegarRotina.addEventListener('click', async () => {
            let rotinas = await window.api.getRotinas(); 
            let dataHoje = await window.api.day();  
        
            let checkboxes = document.querySelectorAll(".tarefa-checkbox");
            
            let rotinasAtualizadas = rotinas.map((rotina, index) => {
                let estaMarcada = checkboxes[index].checked;
                return new Rotina(rotina.nome, rotina.description, rotina.frequency, rotina.color ,estaMarcada);
            });

            await atualizarRotinasChecadas(rotinasAtualizadas, dataHoje);

            // Agora navega para a página
            window.location.href = "rotina.html";
        });
    }
});

carregarRotinas();