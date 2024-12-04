import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";
import {isSafe} from "./isSafe.ts";
import {isSafeDamped} from "./isSafeDamped.ts";

function process(dataLine: string[]): number[] {
    return dataLine.split(" ").map(c => Number(c));
}

export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    data = data.map(process);

    const safe = data.map(isSafe);

    return safe.filter(s => !!s).length;
    /* Whatever needs to be done here to solve the first puzzle. Return the result */
}


export async function solve2(fileName: string): any {

    let data = await readFileAsLineArray(fileName);

    data = data.map(process);

    const safe = data.map(l => [l, isSafeDamped(l)]);

    return safe.filter(s => s[1]).length;
}


