const { startOfWeek, endOfWeek, endOfYear, getDay, differenceInCalendarWeeks, format } = require('date-fns');

class Data {
    day() {
        return format(new Date(),'yyyy-MM-dd');
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
        const end = endOfYear(new Date(year, 11, 31));
        return differenceInCalendarWeeks(end, start, { weekStartsOn: 0 }) + 1;
    }

    countDaysInYear(year) {
        return new Date(year, 1, 29).getDate() === 29 ? 366 : 365;
    }

    today() {
        return getDayOfYear(new Date());
    }
}

class Week extends Data {
    countWeeksInMonth(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const firstSunday = new Date(firstDayOfMonth);
        firstSunday.setDate(firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7);
        
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        const startWeek = startOfWeek(firstSunday, { weekStartsOn: 0 });
        const endWeek = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });
        
        return differenceInCalendarWeeks(endWeek, startWeek, { weekStartsOn: 0 }) + 1;
    }

    countWeeksInAllMonths(year) {
        return Array.from({ length: 12 }, (_, month) => this.countWeeksInMonth(year, month));
    }

    currentWeek() {
        return getISOWeek(new Date());
    }
}

class Month extends Data {
    countMonthsInYear() {
        return 12;
    }

    currentMonth() {
        return new Date().getMonth() + 1;
    }
}

module.exports = {
    data: new Data(),
    day: new Day(),
    week: new Week(),
    month: new Month(),
}