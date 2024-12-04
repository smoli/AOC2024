import {IInputs} from "./IInputs.ts";
import {IRunResult} from "./IRunResult.ts";
import {makeDayPath} from "./makeDayPath.ts";
import {compare} from "./compare.ts";
import * as path from "jsr:@std/path";


export async function runSolutions(day: number, inputs: IInputs): Promise<IRunResult> {
    let actual1 = false;
    let actual2 = false;

    const n = Math.floor(Math.random() * 1000000000);

    try {
        const {solve1, solve2} = await import(path.join("..", makeDayPath(day, "solution.ts?v=" + n)));

        const demo1 = await solve1(inputs.demoInput);
        const demo2 = await solve2(inputs.demoInput);
        let result1 = demo1;
        let result2 = demo2;

        if (compare(inputs.demoSolutions[0], demo1)) {
            result1 = await solve1(inputs.actualInput);
            actual1 = true;
        }

        if (compare(inputs.demoSolutions[1], demo2)) {
            result2 = await solve2(inputs.actualInput);
            actual2 = true;
        }

        return {
            actual1, actual2, demo1, demo2, result1, result2
        }
    } catch (e) {
        console.error("ERROR RUNNING SOLUTION");
        console.log(e);
        console.groupEnd();
    }
}