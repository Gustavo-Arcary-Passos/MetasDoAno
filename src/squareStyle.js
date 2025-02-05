import { startOfWeek, endOfYear, differenceInCalendarWeeks } from "date-fns";

function countWeeksInYear(year) {
    const start = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 6 }); // Sábado
    const end = endOfYear(new Date(year, 11, 31));
    return differenceInCalendarWeeks(end, start, { weekStartsOn: 6 }) + 1;
}

const weeks = countWeeksInYear(2025);
console.log(`Número de semanas em 2025: ${weeks}`);

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

const squareInstance = new SquareGenerator();
const squareStyle = new SquareModel("quadrado-estilo", 20, 4, 0);
const squareTransparency = new SquareColor("quadrado-transparente", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");
const squareColor = new SquareColor("quadrado-color", "rgb(62,165,175)", "1px solid rgb(0,0,0)");
const squareDay = ["quadrado-estilo", "quadrado-color"];
const squareBlank = ["quadrado-estilo", "quadrado-transparente"];

squareStyle.addStyle();
squareColor.addStyle();

const container = document.createElement("div");
container.className = "calendar-container";
document.body.appendChild(container);

let style = document.getElementById("dynamic-styles");
style.innerHTML += `
    .calendar-container {
        display: grid;
        grid-template-columns: repeat(53, 1fr);
        gap: 2px; /* Espaçamento entre quadrados */
        justify-content: left;
        margin: 20px;
    }
`;

for (let i = 0; i < 365; i++) {
    // const squareType = i % 45 === 0 ? squareBlank : squareDay;
    squareInstance.generateSquare(container, squareDay);
}