
class Rotina {
    constructor(nome, description, frequency) {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
    }

    showRotinaCompleta() {
        let div = document.createElement("div");
        div.classList.add("rotina");

        div.innerHTML = `
            <h3>${this.nome}</h3>
            <p><strong>Descrição:</strong> ${this.description}</p>
            <p><strong>Frequência:</strong> ${this.frequency}</p>
        `;
        
        div.addEventListener("click", () => {
            window.location.href = `detalhes.html?nome=${encodeURIComponent(this.nome)}&descricao=${encodeURIComponent(this.description)}&frequencia=${encodeURIComponent(this.frequency)}`;
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
    
        // checkbox.addEventListener("change", () => {
        //     if (checkbox.checked) {
        //         label.style.textDecoration = "line-through";
        //     } else {
        //         label.style.textDecoration = "none";
        //     }
        // });
    
        div.appendChild(checkbox);
        div.appendChild(label);
    
        return div;
    }
}