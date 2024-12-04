import {IInputs} from "./IInputs.ts";
import {makeDayPath} from "./makeDayPath.ts";
import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";

export async function getInputsForDay(day: number): Promise<IInputs> {
    const demoSolutionsFile = makeDayPath(day, "demoSolutions.txt");
    const demoSolutions = (await readFileAsLineArray(demoSolutionsFile));

    const demoInput = makeDayPath(day, "demo.txt");
    const actualInput = makeDayPath(day, "actual.txt");

    return {demoSolutions, demoInput, actualInput}
}