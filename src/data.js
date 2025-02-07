const { startOfWeek, endOfYear, getDay, differenceInCalendarWeeks } = require('date-fns');

class Data {
    
}

class Dia extends Data {
    firstDayYear(year) {
        return getDay(new Date(year, 0, 1));
    }

    lastDayYear(year) {
        return getDay(new Date(year, 11, 31));
    }

    countWeeksInYear(year) {
        const start = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 0 }); // Sábado
        const end = endOfYear(new Date(year, 11, 31));
        return differenceInCalendarWeeks(end, start, { weekStartsOn: 0 }) + 1;
    }

    countDaysInYear(year) {
        return new Date(year, 1, 29).getDate() === 29 ? 366 : 365;
    }
}

module.exports = new Dia();