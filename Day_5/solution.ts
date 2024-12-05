import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";
import {makeWindowGenerator} from "../common/makeWindowGenerator.ts";

interface IRule { a: number, b: number }

function getRulesAndUpdates(data: string[]) {
    const split = [[], []];
    let index = 0;

    for (const line of data) {
        if (line === "") {
            index++;
        } else {
            split[index].push(line);
        }
    }

    const [ruleDate, updateData] = split;

    const rules: IRule[] = ruleDate.map(r => {
        const [a, b] = r.split("|");

        return { a: Number(a), b: Number(b) }
    });

    const updates = updateData.map(u => u.split(",").map(v => Number(v)));

    return { rules, updates };
}


function correctlyOrdered(rules: IRule[], update: number[]): boolean {
    const pairs: Generator<number[]> = makeWindowGenerator(update, 2);

    for (const pair of pairs()) {
        const rule = rules.find(r => {
           if (r.a === pair[0] && r.b === pair[1]) {
               return true;
           }
        });

        if (!rule) {
            return false;
        }

    }

    return true;
}

function fixUpdate(rules: IRule[], update: number[]): number[] {
    const fixed = [...update];

    fixed.sort((a, b) => {
        const smaller = rules.find(r => r.a === a && r.b === b);
        if (smaller) {
            return -1;
        }

        const larger = rules.find(r => r.b === a && r.a === b );
        if (larger) {
            return 1;
        }

        return 0;
    });

    return fixed;
}


export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const randu = getRulesAndUpdates(data);

    let sum = 0;

    for (const update of randu.updates) {
        if (correctlyOrdered(randu.rules, update)) {
            const c = update[Math.floor(update.length / 2)];
            sum += c;
        }
    }

    return sum;
}


export async function solve2(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const randu = getRulesAndUpdates(data);

    let sum = 0;

    for (const update of randu.updates) {
        if (!correctlyOrdered(randu.rules, update)) {
            const fixed = fixUpdate(randu.rules, update);
            const c = fixed[Math.floor(update.length / 2)];
            sum += c;
        }
    }

    return sum;
}