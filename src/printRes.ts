import {IRunResult} from "./IRunResult.ts";

function runtime1(res: IRunResult): string {
    return `${(res.e1 - res.s1).toFixed(3)} ms`
}

function runtime2(res: IRunResult): string {
    return `${(res.e2 - res.s2).toFixed(3)} ms`
}

export function printRes(res: IRunResult) {
    console.log("Puzzle 1:", res.result1, res.actual1 ? `(actual) in ${runtime1(res)} - ${res.demo1} (demo)` : `(demo)`);
    console.log("Puzzle 2:", res.result2, res.actual2 ? `(actual) in ${runtime2(res)} - ${res.demo2} (demo)` : "(demo)");
}
