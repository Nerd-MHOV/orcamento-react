function inMainPeriod(dates: Date[], date: Date) {
    return !!dates.find(item => { return item.getTime() == date.getTime() });
}
export default inMainPeriod;