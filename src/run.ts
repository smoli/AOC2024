import {getInputsForDay} from "./getInputsForDay.ts";
import {runSolutions} from "./runSolutions.ts";
import {printRes} from "./printRes.ts";

export async function run(day: number, actual: boolean) {
    const inputs = await getInputsForDay(day);
    const result = await runSolutions(day, inputs);

    console.group(`Day ${day}`);
    printRes(result);
    console.groupEnd();
}