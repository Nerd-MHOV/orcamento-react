import {days_to_check_dead_line} from "./DaysToStage/Days";
import {Sleep} from "../services/chatguru/Sleep";


export const fsAssistDaysDeadLine = async () => {
    const days = Object.keys(days_to_check_dead_line).reverse();

    for(const day of days) {
        console.log(" [ CRON TAB ] - *fsAssistDaysDeadLine() - to: ", day);
        // @ts-ignore
        await days_to_check_dead_line[day]()
        await Sleep(10000)
        console.log("-------------")
    }
}