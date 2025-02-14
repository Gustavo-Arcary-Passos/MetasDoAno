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

    addClickListener(squareElement, colorActive) {
        squareElement.addEventListener('click', () => {
            const currentColor = squareElement.style.backgroundColor;
            
            if (currentColor === colorActive) {
                squareElement.style.backgroundColor = this.color;
            } else {
                squareElement.style.backgroundColor = colorActive;
            }
        });
    }
}

class SquareGenerator {
    generateSquare(container, squareClasses, squareColor, colorActive, selected = false) {
        const square = document.createElement("div");
        square.className = squareClasses.join(" ");

        if(!squareClasses.includes("quadrado-transparency")) {
            if(selected) {
                square.style.backgroundColor = colorActive;
            }
            squareColor.addClickListener(square, colorActive);
        }

        container.appendChild(square);
    }
}

function generateCalendarDay(year, squareSize, borderSize, colorDefault, colorActive, shouldBeActive) {
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
        squareTransparency.addStyle();

        const container = document.getElementById("calendar");
        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        container.appendChild(calendarContainer);

        let style = document.getElementById("dynamic-styles");
        style.innerHTML += `
            .calendar-container {
                display: grid;
                grid-template-columns: repeat(${weeks}, 1fr);
                gap: 2px;
                justify-content: left;
                margin: 20px;
            }
        `;
        
        let blank = 0;
        let pos;
        for (let i = 0; i < daysInYear + blank; i++) {
            let dayWeek = Math.floor(i / weeks);
            let week = i % weeks;
            if (week == 0 && dayWeek < start) {
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-transparency"], squareColor, colorActive);
                blank += 1;
            } else if (week == (weeks - 1) && dayWeek > end) {
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-transparency"], squareColor, colorActive);
                blank += 1;
            } else {
                pos = week*7 + (dayWeek - start + 1);
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-color"], squareColor, colorActive, shouldBeActive.hasOwnProperty(pos));
            }
        }
    }).catch(error => {
        console.error("Erro ao gerar o calendário:", error);
    });
}

function generateCalendarWeek(year, squareSize, borderSize, colorDefault, colorActive, shouldBeActive) {
    Promise.all([
        window.api.countWeeksInYear(year),
        window.api.countWeeksInAllMonths(year),
    ]).then(([weeks, weeksMonth]) => {
        console.log(`Número de semanas em ${weeks}: ${weeksMonth}`);
        const squareInstance = new SquareGenerator();
        const squareStyle = new SquareModel("quadrado-estilo", squareSize, borderSize, 0);
        const squareColor = new SquareColor("quadrado-color", colorDefault, "1px solid rgb(0,0,0)");
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");

        squareStyle.addStyle();
        squareColor.addStyle();
        squareTransparency.addStyle();

        const container = document.getElementById("calendar");
        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        container.appendChild(calendarContainer); 

        let style = document.getElementById("dynamic-styles");
        style.innerHTML += `
            .calendar-container {
                display: grid;
                grid-template-columns: repeat(${weeksMonth.length}, 1fr);
                gap: 20px;
                justify-content: left;
                margin: 20px;
            }
        `;  
        let month;
        let blank = 0;
        for (let i = 0; i < weeks + blank; i++) {
            month = i % weeksMonth.length;
            if (weeksMonth[month] === 0) {
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-transparency"], squareColor, colorActive);
                blank = blank + 1;
            } else {
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-color"], squareColor, colorActive);
                weeksMonth[month] = weeksMonth[month] - 1;
            }
            if(month < blank && i > weeks){
                break;
            } 
        }
    }).catch(error => {
        console.error("Erro ao gerar o calendário:", error);
    });
}

function generateCalendarMonth(squareSize, borderSize, colorDefault, colorActive, shouldBeActive) {
    window.api.countMonthsInYear().then((months) => {
        const squareInstance = new SquareGenerator();
        const squareStyle = new SquareModel("quadrado-estilo", squareSize, borderSize, 0);
        const squareColor = new SquareColor("quadrado-color", colorDefault, "1px solid rgb(0,0,0)");
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");

        squareStyle.addStyle();
        squareColor.addStyle();
        squareTransparency.addStyle();

        const container = document.getElementById("calendar");
        const calendarContainer = document.createElement("div");
        calendarContainer.className = "calendar-container";
        container.appendChild(calendarContainer);

        let style = document.getElementById("dynamic-styles");
        style.innerHTML += `
            .calendar-container {
                display: grid;
                grid-template-columns: repeat(${months}, 1fr);
                gap: 2px;
                justify-content: left;
                margin: 20px;
            }
        `;

        for (let i = 0; i < months; i++) {
            squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-color"], squareColor, colorActive);
        }
    }).catch(error => {
        console.error("Erro ao gerar o calendário:", error);
    });
}