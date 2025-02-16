const { 
    addDays, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfYear, 
    getDay, getDayOfYear, differenceInCalendarWeeks, 
    format, parseISO
} = require('date-fns');

class Data {
    day() {
        return format(new Date(), 'yyyy-MM-dd');
    }
}

class Day extends Data {
    firstDayYear(year) {
        return getDay(new Date(year, 0, 1));
    }

    lastDayYear(year) {
        return getDay(new Date(year, 11, 31));
    }

    countWeeksInYear(year) {
        const start = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 0 });
        const end = endOfYear(new Date(year, 0, 1));
        return differenceInCalendarWeeks(end, start, { weekStartsOn: 0 }) + 1;
    }

    countDaysInYear(year) {
        return new Date(year, 1, 29).getDate() === 29 ? 366 : 365;
    }

    today(data) {
        try {
            const date = parseISO(data);
            return getDayOfYear(date);
        } catch (error) {
            console.error(`Erro ao processar data: ${data}`, error);
            return null;
        }
    }

    dayFromNumber(year, dayNumber) {
        try {
            const date = addDays(startOfYear(new Date(year, 0, 1)), dayNumber - 1);
            return date.toISOString().split("T")[0];
        } catch (error) {
            console.error(`Erro ao converter dia do ano para data: ${dayNumber}`, error);
            return null;
        }
    }
}

class Week extends Data {
    countWeeksInMonth(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        const startWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
        const endWeek = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });
        
        return differenceInCalendarWeeks(endWeek, startWeek, { weekStartsOn: 0 }) + 1;
    }

    countWeeksInAllMonths(year) {
        return Array.from({ length: 12 }, (_, month) => this.countWeeksInMonth(year, month));
    }

    currentWeek(data) {
        try {
            const date = parseISO(data);
            const firstDayOfMonth = startOfMonth(date);
            const firstWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
            const currentWeekStart = startOfWeek(date, { weekStartsOn: 0 });

            return differenceInCalendarWeeks(currentWeekStart, firstWeekStart, { weekStartsOn: 0 }) + 1;
        } catch (error) {
            console.error(`Erro ao calcular semana para data: ${data}`, error);
            return null;
        }
    }

    weekFromNumber(year, weekNumber) {
        try {
            const firstWeekStart = startOfWeek(startOfYear(new Date(year, 0, 1)), { weekStartsOn: 0 });
            const targetWeekStart = addWeeks(firstWeekStart, weekNumber - 1);
            return targetWeekStart.toISOString().split("T")[0];
        } catch (error) {
            console.error(`Erro ao converter número da semana para data: ${weekNumber}`, error);
            return null;
        }
    }
}

class Month extends Data {
    countMonthsInYear() {
        return 12;
    }

    currentMonth(data) {
        try {
            const date = parseISO(data);
            return date.getMonth() + 1;
        } catch (error) {
            console.error(`Erro ao processar mês para data: ${data}`, error);
            return null;
        }
    }

    monthFromNumber(year, monthNumber) {
        try {
            const date = new Date(year, monthNumber - 1, 1);
            return date.toISOString().split("T")[0];
        } catch (error) {
            console.error(`Erro ao converter número do mês para data: ${monthNumber}`, error);
            return null;
        }
    }
}

const dia = new Day();
const semana = new Week();
const mes = new Month();

function groupDatesBy(dates, groupingMethod) {
    if (!Array.isArray(dates)) {
        console.error('Erro: dates precisa ser um array.');
        return {};
    }

    const grouped = {};

    dates.forEach(({ data }) => {
        if (!data) {
            console.error('Erro: Data inválida encontrada na lista.');
            return;
        }

        let key;
        switch (groupingMethod) {
            case 'month':
                key = mes.currentMonth(data);
                break;
            case 'week':
                key = semana.currentWeek(data);
                break;
            case 'day':
                key = dia.today(data);
                break;
            default:
                key = 'other';
        }

        if (key !== null) {
            console.log(`Data ${data} -> Chave agrupamento: ${key}`);
            grouped[key] = true;
        }
    });

    console.log("Dias checados para calendário diário:", grouped);
    return grouped;
}

module.exports = {
    data: new Data(),
    day: dia,
    week: semana,
    month: mes,
    groupDatesBy,
};