
class Rotina {
    constructor(nome, description, frequency, color, checked = false) {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
        this.color = color;
        this.checked = checked;
    }
    
    showRotinaCompleta(rotinas,listaRotinas) {
        let div = document.createElement("div");
        div.classList.add("rotina");
        const grey = 255;
        div.style.backgroundColor = mixedRGBColors(this.color, `rgb(${grey}, ${grey}, ${grey})`, 65);
        console.log(`BackgroundColor => ${div.style.backgroundColor}`);

        div.innerHTML = `
            <div class="rotina-content">
                <h3>${this.nome}</h3>
                <p><strong>Descrição:</strong> ${this.description}</p>
                <p><strong>Frequência:</strong> ${this.frequency}</p>
            </div>
            <button class="botao-detalhes">Delete</button>
        `;
        
        div.addEventListener("click", () => {
            window.location.href = `detalhes.html?nome=${encodeURIComponent(this.nome)}&descricao=${encodeURIComponent(this.description)}&frequencia=${encodeURIComponent(this.frequency)}&color=${encodeURIComponent(this.color)}`;
        });

        div.querySelector(".botao-detalhes").addEventListener("click", (event) => {
            event.stopPropagation();
            window.api.deleteRotina(this.nome);
            document.getElementById("listaRotinas").innerHTML = "";
            carregarRotinas();
        });    

        return div;
    }

    showTarefaInfo() {
        let div = document.createElement("div");
        div.classList.add("rotina");
        const grey = 255;
        div.style.backgroundColor = mixedRGBColors(this.color, `rgb(${grey}, ${grey}, ${grey})`, 65);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("tarefa-checkbox");
        checkbox.checked = this.checked;
    
        let label = document.createElement("label");
        label.textContent = this.nome;
        label.style.marginLeft = "10px";
    
        div.appendChild(checkbox);
        div.appendChild(label);

        return div;
    }
}