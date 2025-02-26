let listaRotinas = document.getElementById("listaRotinas");

function addRotina() {
    let div = document.createElement("div");
    div.classList.add("rotina");
    
    div.innerHTML = `
        <div class="rotina-content">
            <h3><strong>+</strong></h3>
        </div>
    `;
    
    div.addEventListener("click", () => {
        window.location.href = `addRotina.html`;
    });

    return div;
}

async function carregarRotinas() {
    listaRotinas.innerHTML = ""; 
    let rotinas = await window.api.getRotinas();

    rotinas.forEach(rotina => {
        let rotinaObj = new Rotina(rotina.nome, rotina.description, rotina.frequency, rotina.color);
        listaRotinas.appendChild(rotinaObj.showRotinaCompleta());
    });
    listaRotinas.appendChild(addRotina());
}

document.addEventListener("DOMContentLoaded", () => {
    let navegarRotina = document.getElementById("navegarRotina");
    
    if (navegarRotina) {
        navegarRotina.addEventListener('click', async () => {
            window.location.href = "index.html";
        });
    }
});

carregarRotinas();
