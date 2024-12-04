import {IRunResult} from "./IRunResult.ts";

export function printRes(res: IRunResult) {
    console.log("Puzzle 1:", res.result1, res.actual1 ? `(actual) - ${res.demo1} (demo)` : `(demo)`);
    console.log("Puzzle 2:", res.result2, res.actual2 ? `(actual) - ${res.demo2} (demo)` : "(demo)");
}