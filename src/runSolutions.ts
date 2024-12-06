import {IInputs} from "./IInputs.ts";
import {IRunResult} from "./IRunResult.ts";
import {makeDayPath} from "./makeDayPath.ts";
import {compare} from "./compare.ts";
import * as path from "jsr:@std/path";


export async function runSolutions(day: number, inputs: IInputs): Promise<IRunResult> {
    let actual1 = false;
    let actual2 = false;

    const n = Math.floor(Math.random() * 1000000000);

    let module = {};

    try {
        module = await import(path.join("..", makeDayPath(day, "solution.ts?v=" + n)));
    } catch (e) {
        console.error("ERROR LOADING SOLUTION")
        console.log(e);
        console.groupEnd();
        return {};
    }

    if (!module) {
        return {}
    }

    try {
        const demo1 = await module.solve1(inputs.demoInput);
        const demo2 = await module.solve2(inputs.demoInput);

        let result1 = demo1;
        let result2 = demo2;

        let s1: number;
        let e1: number;
        let s2: number;
        let e2: number;

        if (compare(inputs.demoSolutions[0], demo1)) {
            s1 = performance.now();
            result1 = await module.solve1(inputs.actualInput);
            e1 = performance.now();
            actual1 = true;
        }

        if (compare(inputs.demoSolutions[1], demo2)) {
            s2 = performance.now();
            result2 = await module.solve2(inputs.actualInput);
            e2 = performance.now();
            actual2 = true;
        }

        return {
            actual1, actual2, demo1, demo2, result1, result2, s1, e1, s2, e2
        }
    } catch (e) {
        console.error("ERROR RUNNING SOLUTION");
        console.log(e);
        console.groupEnd();
    }
}