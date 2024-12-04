import {makeDayFolderName} from "./makeDayFolderName.ts";
import {getInputsForDay} from "./getInputsForDay.ts";
import {runSolutions} from "./runSolutions.ts";
import {printRes} from "./printRes.ts";
import {debounce} from "jsr:@std/async/debounce";


export async function watch(day: number, actual: boolean) {
    const folder = makeDayFolderName(day);

    const inputs = await getInputsForDay(day);

    const watcher = Deno.watchFs(folder);

    const debRun = debounce(async () => {
        console.group(`
Rerunning Day ${day}
===================================================================================
`);
        const res = await runSolutions(day, inputs);
        printRes(res);

        console.groupEnd();
    }, 1000);


    debRun();

    for await (const event of watcher) {
        await debRun(day, actual);
    }
}