import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";
import {unzip} from "../common/unzip.ts";

function process(data: string[]): string[string[]] {
    return data.map(line => {
       return line.split(/\s+/).map(r => r.trim());
    });
}


export async function solve1(fileName: string) {
    let data = await readFileAsLineArray(fileName);

    data = process(data);
    const [a, b] = unzip(data);

    a.sort((a, b) => a - b);
    b.sort((a, b) => a - b);

    return a.reduce((a, c, i) => {
        return a + Math.abs(Number(c) - b[i]);
    }, 0);
}


export async function solve2(fileName: string) {
    let data = await readFileAsLineArray(fileName);

    data = process(data);
    const [left, right] = unzip(data);

    return left.reduce((a, c) => {
        return a + Number(c) * right.filter(x => x === c).length;
    }, 0);
}