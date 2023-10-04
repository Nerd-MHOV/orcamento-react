export const checkDeadLine = (
    day_to_compare: Date | null, days_to_dead_line: number
) => {
    try {
        if(!day_to_compare) throw new Error(`this is not a Date`)
        const deadLine = new Date();
        deadLine.setDate(deadLine.getDate() + days_to_dead_line)
        return day_to_compare <= deadLine;
    }catch (e) {
        console.log(` [ ERROR ] - *checkDeadLine() - Error to check dead line...`)
        return false;
    }
}