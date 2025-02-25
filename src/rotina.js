
class Rotina {
    constructor(nome, description, frequency, color, checked = false, dataHoje = "") {
        this.nome = nome;
        this.description = description;
        this.frequency = frequency;
        this.color = color;
        this.checked = checked;
        this.currChecked = null;
        this.allChecked = null;

        // if (dataHoje) {
        //     this.init(dataHoje);
        // }
    }

    // async init(dataHoje) {
    //     this.currChecked = await this.getCurrChecked(dataHoje);
    //     this.allChecked = await this.getAllChecked();
    // }

    async getCurrChecked(dataHoje) {
        if (this.frequency === "Diária") {
            return await window.api.today(dataHoje);
        } else if (this.frequency === "Semanal") {
            const dataDomingo = await window.api.getSundayOfWeek(dataHoje);
            return await window.api.currentWeek(dataDomingo);
        } else if (this.frequency === "Mensal") {
            const dataFirstDayMonth = await window.api.getFirstDayOfMonth(dataHoje);
            return await window.api.currentMonth(dataFirstDayMonth);
        }
    }

    async getAllChecked() {
        const data = await window.api.getRotinaDatas(this.nome);
        if (this.frequency === "Diária") {
            return await window.api.groupDatesBy(data, 'day');
        } else if (this.frequency === "Semanal") {
            return await window.api.groupDatesBy(data, 'week');
        } else if (this.frequency === "Mensal") {
            return await window.api.groupDatesBy(data, 'month');
        }
    }

    async calculateStreak() {

        const dataHoje = await window.api.day();
        this.currChecked = await this.getCurrChecked(dataHoje);
        this.allChecked = await this.getAllChecked();

        // if (!this.currChecked || !this.allChecked) {
        //     console.warn("Esperando os dados carregarem...");
        //     return 0;
        // }

        if (this.checked) {
            let currStreak = 0;
            console.log(`${this.currChecked}`);
            for (let i = this.currChecked; i >= 1; i--) {
                console.log(`${i}`);
                if (!this.allChecked.hasOwnProperty(i)) {
                    break;
                }
                currStreak += 1;
            }
            return currStreak;
        }
        return 0;
    }
    
    showRotinaCompleta(rotinas,listaRotinas) {
        let div = document.createElement("div");
        div.classList.add("rotina");
        const white = 255;
        div.style.backgroundColor = mixedRGBColors(this.color, `rgb(${white}, ${white}, ${white})`, 65);
        console.log(`BackgroundColor => ${div.style.backgroundColor}`);

        let botao = document.createElement("button");
        botao.innerHTML = "🗑️";
        botao.style.width = "120px";
        botao.style.height = "120px";
        botao.style.fontSize = "60px";
        botao.style.backgroundColor = mixedRGBColors(this.color, `rgb(${white}, ${white}, ${white})`, 75);
        botao.style.color = "white";
        botao.style.border = "none";
        botao.style.cursor = "pointer";
        botao.style.borderRadius = "5px";
        botao.style.display = "flex";
        botao.style.alignItems = "center";
        botao.style.justifyContent = "center";

        let hoverColor = mixedRGBColors(this.color, `rgb(${white}, ${white}, ${white})`, 55);

        botao.addEventListener("mouseenter", () => {
            botao.style.backgroundColor = hoverColor;
        });

        botao.addEventListener("mouseleave", () => {
            botao.style.backgroundColor = mixedRGBColors(this.color, `rgb(${white}, ${white}, ${white})`, 75);
        });

        botao.addEventListener("click", (event) => {
            event.stopPropagation();
            window.api.deleteRotina(this.nome);
            document.getElementById("listaRotinas").innerHTML = "";
            carregarRotinas();
        });

        let contentDiv = document.createElement("div");
        contentDiv.classList.add("rotina-content");
        contentDiv.innerHTML = `
            <h3>${this.nome}</h3>
            <p><strong>Descrição:</strong> ${this.description}</p>
            <p><strong>Frequência:</strong> ${this.frequency}</p>
        `;

        div.addEventListener("click", () => {
            window.location.href = `detalhes.html?nome=${encodeURIComponent(this.nome)}&descricao=${encodeURIComponent(this.description)}&frequencia=${encodeURIComponent(this.frequency)}&color=${encodeURIComponent(this.color)}`;
        });

        div.appendChild(contentDiv);
        div.appendChild(botao);

        return div;
    }

    async showTarefaInfo() {
        const white = 255;
        const black = 0;
    
        let div = document.createElement("div");
        div.classList.add("rotina");
        div.style.backgroundColor = mixedRGBColors(this.color, `rgb(${white}, ${white}, ${white})`, 65);
    
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("tarefa-checkbox");
        checkbox.checked = this.checked;
    
        let label = document.createElement("label");
        label.textContent = this.nome;
        label.style.marginLeft = "10px";
    
        let fireEmojiDiv = document.createElement("div");
        fireEmojiDiv.classList.add("streak");
        fireEmojiDiv.style.backgroundColor = mixedRGBColors(this.color, `rgb(${white}, ${white}, ${white})`, 25);
    
        let fireEmoji = document.createElement("span");
        fireEmoji.style.color = mixedRGBColors(this.color, `rgb(${black}, ${black}, ${black})`, 35);
    
        const currStreak = await this.calculateStreak(); 
    
        fireEmoji.innerHTML = `${currStreak} 🔥`;
        fireEmoji.style.marginLeft = "10px";
    
        fireEmojiDiv.appendChild(fireEmoji);
    
        div.style.display = "flex";
        div.style.alignItems = "center";
    
        label.style.flexGrow = "1";
    
        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(fireEmojiDiv);
    
        return div;
    }
}