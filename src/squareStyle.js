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
    generateSquare(container, squareClasses, squareColorDeactive, squareColorActive, calendarConverter = ( year, index) => index,index = -1, selected = false) {
        const square = document.createElement("div");
        const rotina = document.getElementById("rotinaNome").innerText;
        square.className = squareClasses.join(" ");
        square.dataset.index = index;

        if (!squareClasses.includes("quadrado-transparency")) {
            if (selected) {
                square.classList.remove(squareColorDeactive);
                square.classList.add(squareColorActive);
            }

            square.addEventListener("click", async (event) => {
                const target = event.currentTarget;
                const squareNumber = target.dataset.index;
                const data = await calendarConverter(2025, squareNumber);
                let checkbox = document.getElementById("tarefaCheckbox");
                if(checkbox.checked){
                    if (target.classList.contains(squareColorDeactive)) {
                        await window.api.adicionarRotinaData(rotina, data);
                        target.classList.remove(squareColorDeactive);
                        target.classList.add(squareColorActive);
                    } else {
                        await window.api.removerRotinaData(rotina, data);
                        target.classList.remove(squareColorActive);
                        target.classList.add(squareColorDeactive);
                    }
                }
            });
        }

        container.appendChild(square);
    }

    generateSquareAllTasks(container, squareClasses) {
        const square = document.createElement("div");
        square.className = squareClasses.join(" ");
        square.dataset.index = -1;

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
        const squareColorDeactive = new SquareColor("quadrado-deactive", colorDefault, "1px solid rgb(0,0,0)");
        const squareColorActive = new SquareColor("quadrado-active", colorActive, "1px solid rgb(0,0,0)");
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");

        squareStyle.addStyle();
        squareColorDeactive.addStyle();
        squareColorActive.addStyle();
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
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-transparency"], squareColorDeactive.className, squareColorActive.className, window.api.dayFromNumber);
                blank += 1;
            } else if (week == (weeks - 1) && dayWeek > end) {
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-transparency"], squareColorDeactive.className, squareColorActive.className, window.api.dayFromNumber);
                blank += 1;
            } else {
                pos = week*7 + (dayWeek - start + 1);
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-deactive"], squareColorDeactive.className, squareColorActive.className, window.api.dayFromNumber,pos, shouldBeActive.hasOwnProperty(pos));
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
        let weeksMonthCopy = weeksMonth.slice();
        function somaAteIndice(lista, x) {
            if (x < 0) return 0;
            return lista.slice(0, x + 1).reduce((acc, num) => acc + num, 0);
        }

        const squareInstance = new SquareGenerator();
        const squareStyle = new SquareModel("quadrado-estilo", squareSize, borderSize, 0);
        const squareColorDeactive = new SquareColor("quadrado-deactive", colorDefault, "1px solid rgb(0,0,0)");
        const squareColorActive = new SquareColor("quadrado-active", colorActive, "1px solid rgb(0,0,0)");
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");

        squareStyle.addStyle();
        squareColorDeactive.addStyle();
        squareColorActive.addStyle();
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
        let pos;
        for (let i = 0; i < weeks + blank; i++) {
            month = i % weeksMonth.length;
            if (weeksMonthCopy[month] === 0) {
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-transparency"], squareColorDeactive.className, squareColorActive.className, window.api.weekFromNumber);
                blank = blank + 1;
            } else {
                pos = somaAteIndice(weeksMonth,month-1) + Math.floor(i/weeksMonth.length) + 1;
                squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-deactive"], squareColorDeactive.className, squareColorActive.className, window.api.weekFromNumber, pos + 1, shouldBeActive.hasOwnProperty(pos));
                weeksMonthCopy[month] = weeksMonthCopy[month] - 1;
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
        const squareColorDeactive = new SquareColor("quadrado-deactive", colorDefault, "1px solid rgb(0,0,0)");
        const squareColorActive = new SquareColor("quadrado-active", colorActive, "1px solid rgb(0,0,0)");
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");

        squareStyle.addStyle();
        squareColorDeactive.addStyle();
        squareColorActive.addStyle();
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
            squareInstance.generateSquare(calendarContainer, ["quadrado-estilo", "quadrado-deactive"], squareColorDeactive.className, squareColorActive.className, window.api.monthFromNumber, i+1, shouldBeActive.hasOwnProperty(i+1));
        }
    }).catch(error => {
        console.error("Erro ao gerar o calendário:", error);
    });
}

function generateCalendarAllTasks(year, squareSize, borderSize, numberTasks, colorDefault, colorActive, shouldBeActive) {
    Promise.all([
        window.api.countWeeksInYear(year),
        window.api.countDaysInYear(year),
        window.api.firstDayYear(year),
        window.api.lastDayYear(year)
    ]).then(([weeks, daysInYear, start, end]) => {
        console.log(`Número de semanas em ${year}: ${weeks}`);
        console.log(`Número de dias em ${year}: ${daysInYear}`);

        const squareInstance = new SquareGenerator();
        const squareStyle = new SquareModel("quadrado-estilo", squareSize, borderSize, 0);

        const gradientColors = [];
    
        for (let i = 0; i <= numberTasks; i++) {
            console.log(`factor = ${i}/${numberTasks}*50 + 50`);
            const factor = (i / (numberTasks)) * 100;
            const interpolatedColor = mixedRGBColors(colorActive,colorDefault, factor);
            console.log(`i = ${i} factor = ${factor} interpolatedColor = ${interpolatedColor}`);
            gradientColors.push(new SquareColor(`quadrado-active-${i}`, interpolatedColor, "1px solid rgb(0,0,0)"));
            gradientColors[i].addStyle();
        }
        const squareTransparency = new SquareColor("quadrado-transparency", "rgba(0,0,0,0)", "1px solid rgba(0,0,0,0)");
        const squareTest = new SquareColor("quadrado-test", "rgb(255,125,75)", "1px solid rgb(0,0,0)");
        
        squareStyle.addStyle();
        squareTransparency.addStyle();
        squareTest.addStyle();

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
                squareInstance.generateSquareAllTasks(calendarContainer, ["quadrado-estilo", "quadrado-transparency"]);
                blank += 1;
            } else if (week == (weeks - 1) && dayWeek > end) {
                squareInstance.generateSquareAllTasks(calendarContainer, ["quadrado-estilo", "quadrado-transparency"]);
                blank += 1;
            } else {
                pos = week*7 + (dayWeek - start + 1);
                if (shouldBeActive.hasOwnProperty(pos)){
                    // console.log(`Gradiente ${shouldBeActive[pos]}`);
                    squareInstance.generateSquareAllTasks(calendarContainer, ["quadrado-estilo", gradientColors[shouldBeActive[pos]].className]);
                } else {
                    squareInstance.generateSquareAllTasks(calendarContainer, ["quadrado-estilo", gradientColors[0].className]);
                }
            }
        }

        const calendarLegend = document.createElement("div");
        calendarLegend.className = "calendar-legend";
        container.appendChild(calendarLegend);

        let calendarLegendStyle = document.getElementById("dynamic-styles");
        calendarLegendStyle.innerHTML += `
            .calendar-legend {
                display: grid;
                grid-template-columns: repeat(${gradientColors.length}, auto);
                gap: 2px;
                justify-content: start;
                margin: 20px;
            }
            .legend-text {
                text-align: center;
                font-size: 14px;
                font-weight: bold;
            }
        `;

        for (let i = 0; i < gradientColors.length; i++) {
            squareInstance.generateSquareAllTasks(calendarLegend, ["quadrado-estilo", gradientColors[i].className]);
        }
        for (let i = 0; i < gradientColors.length; i++) {
            let textWrapper = document.createElement("div");
            textWrapper.className = "legend-text";
            textWrapper.innerText = i;

            calendarLegend.appendChild(textWrapper);
        }

    }).catch(error => {
        console.error("Erro ao gerar o calendário:", error);
    });
}