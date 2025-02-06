const { startOfWeek, endOfYear, differenceInCalendarWeeks } = require('date-fns');

function countWeeksInYear(year) {
    const start = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 6 }); // Sábado
    const end = endOfYear(new Date(year, 11, 31));
    return differenceInCalendarWeeks(end, start, { weekStartsOn: 6 }) + 1;
}

module.exports = { countWeeksInYear };