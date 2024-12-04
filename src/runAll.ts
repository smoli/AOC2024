import {getAllDays} from "./getAllDays.ts";
import {run} from "./run.ts";

export async function runAll() {
    const days = await getAllDays();

    for (const day of days) {
        await run(day);
        console.log()
    }
}