import {assistDBStatus} from "../helpers/assistDBStatus";

export const fsAssistDBStatus = async  () => {

    console.log(" [ CRON ] fs assist db Status ")
    await assistDBStatus();

}



