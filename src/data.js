const { 
    addDays, addWeeks, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfYear, 
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
        
        const firstSunday = new Date(firstDayOfMonth);
        firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7);
        
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const lastSunday = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

        return differenceInCalendarWeeks(lastSunday, firstSunday, { weekStartsOn: 0 }) + 1;
    }

    countWeeksInAllMonths(year) {
        const result = Array.from({ length: 12 }, (_, month) => this.countWeeksInMonth(year, month));
        console.log(result);
        return result;
    }

    currentWeek(data) {
        try {
            const date = parseISO(data);
            
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            
            const firstSunday = new Date(firstDayOfYear);
            firstSunday.setDate(firstDayOfYear.getDate() + (7 - firstDayOfYear.getDay()) % 7);
            
            const currentWeekStart = startOfWeek(date, { weekStartsOn: 0 });
    
            const weekNumber = differenceInCalendarWeeks(currentWeekStart, firstSunday, { weekStartsOn: 0 }) + 1;
            
            console.log(`Semana calculada: ${weekNumber}`);
    
            return weekNumber;
        } catch (error) {
            console.error(`Erro ao calcular semana para data: ${data}`, error);
            return null;
        }
    }

    weekFromNumber(year, weekNumber) {
        try {
            console.log(`weekNumber recebido: ${weekNumber}`);

            const firstDayOfYear = new Date(year, 0, 1);
            const firstSunday = startOfWeek(firstDayOfYear, { weekStartsOn: 0 });

            const targetWeekStart = addWeeks(firstSunday, weekNumber - 1);

            if (targetWeekStart.getFullYear() !== year) {
                console.warn(`Ajustando weekNumber ${weekNumber}, pois ultrapassou o ano ${year}.`);
                return null;
            }

            return targetWeekStart.toISOString().split("T")[0];
        } catch (error) {
            console.error(`Erro ao converter número da semana para data: ${weekNumber}`, error);
            return null;
        }
    }

    getSundayOfWeek(dateString) {
        try {
            const date = parseISO(dateString);
            const sunday = startOfWeek(date, { weekStartsOn: 0 });
            const sundayFormat = format(sunday, 'yyyy-MM-dd');
            console.log(sundayFormat);
            return sundayFormat;
        } catch (error) {
            console.error(`Erro ao calcular domingo da semana para data: ${dateString}`, error);
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

    getFirstDayOfMonth(dateString) {
        try {
            const date = parseISO(dateString);
            const firstDay = startOfMonth(date);
            return format(firstDay, 'yyyy-MM-dd');
        } catch (error) {
            console.error(`Erro ao calcular o primeiro dia do mês para data: ${dateString}`, error);
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

    dates.forEach(({ data, count }) => {
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
            case 'overview':
                key = dia.today(data);
                break;
            default:
                key = 'other';
        }

        if (key !== null && groupingMethod != 'overview') {
            console.log(`Data ${data} -> Chave agrupamento: ${key}`);
            grouped[key] = true;
        } else {
            grouped[key] = count;
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