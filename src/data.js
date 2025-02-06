const { startOfWeek, endOfYear, differenceInCalendarWeeks } = require('date-fns');

class Data {
    constructor(gridInfo)
    {
        this.gridInfo = gridInfo;
    }

    square() {

        let quadrado = document.createElement("div");

        quadrado.style.position = "absolute";
        quadrado.style.top = "50%";
        quadrado.style.left = "50%";
        quadrado.style.transform = "translate(-50%, -50%)";
        quadrado.style.backgroundColor = "blue";
        quadrado.style.borderRadius = "5px";

        const resizeSquare = () => {
            let larguraTela = window.innerWidth;
            let alturaTela = window.innerHeight;
            let tamanho = Math.min(larguraTela, alturaTela) * 0.2;

            quadrado.style.width = tamanho + "px";
            quadrado.style.height = tamanho + "px";
        };

        resizeSquare();
        window.addEventListener("resize", resizeSquare);

        document.body.appendChild(quadrado);
    }

    generateGrid() {
        let div = document.createElement("div");

    }
    
}

class Dia extends Data {
    countWeeksInYear(year) {
        const start = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 6 }); // Sábado
        const end = endOfYear(new Date(year, 11, 31));
        return differenceInCalendarWeeks(end, start, { weekStartsOn: 6 }) + 1;
    }
}

function 

module.exports = { countWeeksInYear };