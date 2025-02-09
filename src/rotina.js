
class Rotina {
    constructor(nome, description, frequency) {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
    }

    showRotinaCompleta(rotinas,listaRotinas) {
        let div = document.createElement("div");
        div.classList.add("rotina");
        
        div.innerHTML = `
            <div class="rotina-content">
                <h3>${this.nome}</h3>
                <p><strong>Descrição:</strong> ${this.description}</p>
                <p><strong>Frequência:</strong> ${this.frequency}</p>
            </div>
            <button class="botao-detalhes">Delete</button>
        `;
        
        div.addEventListener("click", () => {
            window.location.href = `detalhes.html?nome=${encodeURIComponent(this.nome)}&descricao=${encodeURIComponent(this.description)}&frequencia=${encodeURIComponent(this.frequency)}`;
        });

        div.querySelector(".botao-detalhes").addEventListener("click", (event) => {
            event.stopPropagation();
            window.api.deleteRotina(this.nome); //await
            document.getElementById("listaRotinas").innerHTML = "";
            carregarRotinas(); // await
        });    

        return div;
    }

    showTarefaInfo() {
        let div = document.createElement("div");
        div.classList.add("rotina");
    
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("tarefa-checkbox");
    
        let label = document.createElement("label");
        label.textContent = this.nome;
        label.style.marginLeft = "10px";
    
        div.appendChild(checkbox);
        div.appendChild(label);
    
        return div;
    }
}