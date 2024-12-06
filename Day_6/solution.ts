import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";


const EMPTY = ".";
const MARK = "X";

interface IGuard {
    x: number,
    y: number,
    dx: number,
    dy: number
}

function findGuard(data: string[][]): IGuard {
    for (let y = 0; y < data.length; y++) {
        const line = data[y];

        const x = line.findIndex(c => c.match(/[\^v<>]/));

        if (x !== -1) {
            let dx = 0;
            let dy = 0;
            switch (line[x]) {
                case "^":
                    dy = -1;
                    break;

                case "v":
                    dy = 1;
                    break;

                case ">":
                    dx = 1;
                    break;

                case "<":
                    dy = -1;
                    break;
            }

            return {
                x, y, dx, dy
            };
        }
    }
}

function getMapAt(data: string[][], x: number, y: number): string {
    return data[y][x];
}

function markMapAt(data: string[][], x: number, y: number) {
    data[y][x] = MARK;
}

function turn(guard: IGuard): IGuard {
    const ng: IGuard = {...guard};
    if (ng.dx === 0 && ng.dy === -1) {
        ng.dx = 1;  // +1
        ng.dy = 0;  // +1

        return ng;
    }

    if (ng.dx === 1 && ng.dy === 0) {
        ng.dx = 0; // -1
        ng.dy = 1; // +1

        return ng;
    }

    if (ng.dx === 0 && ng.dy === 1) {
        ng.dx = -1; // -1
        ng.dy = 0;  // -1

        return ng;
    }

    if (ng.dx === -1 && ng.dy === 0) {
        ng.dx = 0; // +1
        ng.dy = -1; // -1

        return ng;
    }

    throw new Error("Unreachable");
}

function getFutureGuard(guard: IGuard): IGuard {
    return {...guard, x: guard.x + guard.dx, y: guard.y + guard.dy}
}

function step(data: string[][], guard: IGuard): IGuard {
    let ng: IGuard = {...guard};

    const future = getFutureGuard(ng)
    if (outside(data, future)) {
        return future;
    }

    const m = getMapAt(data, guard.x + guard.dx, guard.y + guard.dy);

    if (m !== EMPTY && m !== MARK) {
        ng = turn(ng);
        return step(data, ng);
    }

    ng.x += ng.dx;
    ng.y += ng.dy;

    return ng;
}

function outside(data: string[][], guard: IGuard): boolean {
    return guard.x < 0 || guard.y < 0 || guard.x >= data[0].length || guard.y >= data.length;

}

function countMarks(data: string[][]): number {
    const conc = data.map(d => d.join("")).join("");

    return conc.match(/X/g).length;
}


export async function solve1(fileName: string): any {
    let raw = await readFileAsLineArray(fileName);

    const data = raw.map(s => s.split(""));

    let guard = findGuard(data);


    while (!outside(data, guard)) {
        markMapAt(data, guard.x, guard.y)
        guard = step(data, guard);
    }

    return countMarks(data);
}


export async function solve2(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    /* Whatever needs to be done here to solve the first puzzle. Return the result */
}