// const { startOfWeek, endOfYear, differenceInCalendarWeeks } = require('date-fns')

// function countWeeksInYear(year) {
//     const start = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 6 }); // Sábado
//     const end = endOfYear(new Date(year, 11, 31));
//     return differenceInCalendarWeeks(end, start, { weekStartsOn: 6 }) + 1;
// }

// const weeks = countWeeksInYear(2025);
// console.log(`Número de semanas em 2025: ${weeks}`);

class SquareModel {
    constructor(className, size, borderRadius, margin) {
        this.className = className;
        this.width = size + "px";
        this.height = size + "px";
        this.borderRadius = borderRadius + "px";
        this.margin = margin + "px";
    }

    addStyle() {
        let style = document.getElementById("dynamic-styles");

        if (!style) {
            style = document.createElement("style");
            style.id = "dynamic-styles";
            document.head.appendChild(style);
        }

        style.innerHTML += `
            .${this.className} {
                width: ${this.width};
                height: ${this.height};
                border-radius: ${this.borderRadius};
                margin: ${this.margin};
                display: inline-block;
            }
        `;
    }
}

class SquareColor {
    constructor(className, color, border) {
        this.className = className;
        this.color = color;
        this.border = border;
    }

    addStyle() {
        let style = document.getElementById("dynamic-styles");

        if (!style) {
            style = document.createElement("style");
            style.id = "dynamic-styles";
            document.head.appendChild(style);
        }

        style.innerHTML += `
            .${this.className} {
                background-color: ${this.color};
                border: ${this.border};
            }
        `;
    }
}

class SquareGenerator {
    generateSquare(container, squareClasses) {
        const square = document.createElement("div");
        square.className = squareClasses.join(" ");
        container.appendChild(square);
    }
}

// Chamando a função exposta no preload.js
window.api.countWeeksInYear(2025).then((weeks) => {
    console.log(`Número de semanas em 2025: ${weeks}`);
  
    // Agora você pode usar o valor de 'weeks' para gerar a grid de quadrados
    const squareInstance = new SquareGenerator();
    const squareStyle = new SquareModel("quadrado-estilo", 24, 5, 0);
    const squareColor = new SquareColor("quadrado-color", "rgb(62,165,175)", "1px solid rgb(0,0,0)");
  
    // Adicionando os estilos
    squareStyle.addStyle();
    squareColor.addStyle();
  
    // Contêiner para os quadrados
    const container = document.createElement("div");
    container.className = "calendar-container";
    document.body.appendChild(container);
  
    // Estilo para o contêiner de calendário
    let style = document.getElementById("dynamic-styles");
    style.innerHTML += `
        .calendar-container {
            display: grid;
            grid-template-columns: repeat(${weeks}, 1fr); /* Usando o número de semanas para definir as colunas */
            gap: 2px; /* Espaçamento entre quadrados */
            justify-content: left;
            margin: 20px;
        }
    `;
  
    // Gerando os quadrados com base nas semanas
    for (let i = 0; i < 365; i++) {
      squareInstance.generateSquare(container, ["quadrado-estilo", "quadrado-color"]);
    }
  });  