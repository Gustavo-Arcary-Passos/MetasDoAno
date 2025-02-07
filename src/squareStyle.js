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

    // Função para alternar a cor ao clicar
    addClickListener(squareElement, colorActive) {
        squareElement.addEventListener('click', () => {
            const currentColor = squareElement.style.backgroundColor;
            // Alterna entre a cor ativa e a cor original
            if (currentColor === colorActive) {
                squareElement.style.backgroundColor = this.color;  // Cor original
            } else {
                squareElement.style.backgroundColor = colorActive; // Cor ativa
            }
        });
    }
}

class SquareGenerator {
    generateSquare(container, squareClasses, squareColor, colorActive) {
        const square = document.createElement("div");
        square.className = squareClasses.join(" ");

        // Adiciona o listener de clique para trocar de cor
        squareColor.addClickListener(square, colorActive);

        container.appendChild(square);
    }
}

function generateCalendar(year, squareSize, borderSize, colorDefault, colorActive) {
    Promise.all([
        window.api.countWeeksInYear(year),
        window.api.countDaysInYear(year),
        window.api.firstDayYear(year),
        window.api.lastDayYear(year),
    ]).then(([weeks, daysInYear, start, end]) => {
        console.log(`Número de semanas em ${year}: ${weeks}`);
        console.log(`Número de dias em ${year}: ${daysInYear}`);

        const squareInstance = new SquareGenerator();
        const squareStyle = new SquareModel("quadrado-estilo", squareSize, borderSize, 0);
        const squareColor = new SquareColor("quadrado-color", colorDefault, "1px solid rgb(0,0,0)");
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");

        squareStyle.addStyle();
        squareColor.addStyle();

        const container = document.createElement("div");
        container.className = "calendar-container";
        document.body.appendChild(container);

        let style = document.getElementById("dynamic-styles");
        style.innerHTML += `
            .calendar-container {
                display: grid;
                grid-template-columns: repeat(${weeks}, 1fr); /* Define as colunas com base no número de semanas */
                gap: 2px;
                justify-content: left;
                margin: 20px;
            }
        `;

        let blank = 0;
        for (let i = 0; i < daysInYear + blank; i++) {
            let dayWeek = Math.floor(i / weeks);
            let week = i % weeks;
            if (week == 0 && dayWeek < start) {
                squareInstance.generateSquare(container, ["quadrado-estilo", "quadrado-transparency"], squareColor, colorActive);
                blank += 1;
            } else if (week == (weeks - 1) && dayWeek > end) {
                squareInstance.generateSquare(container, ["quadrado-estilo", "quadrado-transparency"], squareColor, colorActive);
                blank += 1;
            } else {
                squareInstance.generateSquare(container, ["quadrado-estilo", "quadrado-color"], squareColor, colorActive);
            }
        }
    }).catch(error => {
        console.error("Erro ao gerar o calendário:", error);
    });
}

generateCalendar(2025, 24, 5, "rgb(31,92,97)", "rgb(62,185,195)");
