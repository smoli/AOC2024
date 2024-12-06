import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";

const EMPTY = ".";
const MARK = "X";
const OBSTACLE = "#";


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
    let nextGuard: IGuard = {...guard};

    const future = getFutureGuard(nextGuard)
    if (outside(data, future)) {
        return future;
    }

    const m = getMapAt(data, guard.x + guard.dx, guard.y + guard.dy);

    if (m === OBSTACLE) {
        nextGuard = turn(nextGuard);
        return step(data, nextGuard);
    }

    nextGuard.x += nextGuard.dx;
    nextGuard.y += nextGuard.dy;

    return nextGuard;
}

function outside(data: string[][], guard: IGuard, offset: number = 0): boolean {
    return guard.x < 0 - offset || guard.y < 0 - offset || guard.x >= data[0].length + offset || guard.y >= data.length + offset;

}

function countMarks(data: string[][]): number {
    const concatenation = data.map(d => d.join("")).join("");

    return concatenation.match(/X/g).length;
}


function runsOut(map: string[][], newObstacle: IGuard, guard: IGuard) {
    const localMap = map.map(d => d.map(d => d));

    localMap[newObstacle.y][newObstacle.x] = OBSTACLE;

    const trail: IGuard[][][] = map.map(d => d.map(() => new Array(0)));


    let localGuard = {...guard};

    while (!outside(localMap, localGuard)) {
        markMapAt(localMap, localGuard.x, localGuard.y);

        const o = trail[localGuard.y][localGuard.x];

        if (o.find(o => o.dx === localGuard.dx && o.dy === localGuard.dy)) {
            // Walked this path before in this direction
            return false;
        }

        o.push(localGuard);
        localGuard = step(localMap, localGuard);
    }

    return true;
}


function pad(data: string[][]): string[][] {
    const r = data.map(d => d.map(d => d));

    for (const line of r) {
        line.unshift(EMPTY);
        line.push(EMPTY);
    }

    r.unshift(r[0].map(r => EMPTY));
    r.push(r[0].map(r => EMPTY));

    return r;
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
    let raw = await readFileAsLineArray(fileName);

    const data = pad(raw.map(s => s.split("")), 1);

    let guard = findGuard(data);
    let start = {...guard};
    let loops: IGuard[] = [];

    while (!outside(data, guard)) {

        let newObstacle = getFutureGuard(guard);

        if (!outside(data, newObstacle)) {
            const m = getMapAt(data, newObstacle.x, newObstacle.y);
            if (m === EMPTY || m === MARK) {
                let deviated = turn(guard);

                if ((newObstacle.x !== start.x || newObstacle.y !== start.y) &&
                    !runsOut(data, newObstacle, deviated)) {
                    if (!loops.find(l => l.x === newObstacle.x && l.y === newObstacle.y)) {
                        loops.push(newObstacle);
                    }
                }
            }
        }

        markMapAt(data, guard.x, guard.y)
        guard = step(data, guard);
    }

    return loops.length;
}