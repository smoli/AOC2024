import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";

function parseMul(input: string): { a: number, b: number }[] {


    const reg = /mul\(\d+,\d+\)/g;
    const reg2 = /mul\((\d+),(\d+)\)/;

    const matches = input.match(reg);

    if (!matches) {
        return [];
    }

    const ret: { a: number, b: number }[] = [];


    for (let i = 0; i < matches.length; i++) {
        const m2 = matches[i].match(reg2);
        ret.push({a: Number(m2[1]), b: Number(m2[2])});
    }

    return ret;
}

function parseMul2(input: string): { a: number, b: number }[] {


    const reg = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
    const reg2 = /mul\((\d+),(\d+)\)/;

    let on = true;

    const matches = input.match(reg);

    if (!matches) {
        return [];
    }

    const ret: { a: number, b: number }[] = [];


    for (let match of matches) {

        if (match === "don't()") {
            on = false;
        } else if (match === "do()") {
            on = true;
        } else if (on) {
            const m2 = match.match(reg2);
            ret.push({a: Number(m2[1]), b: Number(m2[2])});
        }
    }

    return ret;
}


export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    let sum = 0;

    const muls = parseMul(data.join(""));
    muls.forEach(m => sum += m.a * m.b);

    return sum;
}


export async function solve2(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    let sum = 0;

    const muls = parseMul2(data.join(""));
    muls.forEach(m => sum += m.a * m.b);


    return sum;
}