import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";
import {traverse} from "./traverse.ts";
import {getWindow} from "./getWindow.ts";


export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);
    let acc = "";

    const w = data[0].length;
    const h = data.length;

    const loadAcc = (c: string, x: number, y: number) => {
        acc += c;
    }

    const diagonal = (sx, sy, dx, dy) => {
        let y = sy;

        for (let i = 0; i < h; i++) {
            let x = sx;

            if (y === sy) {
                for (let j = 0; j < w; j++) {
                    traverse(data, x, y, dx, dy, loadAcc);
                    acc += " ";
                    x += dx;
                }
            }
            traverse(data, x, y, dx, dy, loadAcc);
            acc += " ";
            y += dy;
        }
    }

    // Horizontal
    let y = h;
    while (y--) {
        traverse(data, 0, y, 1, 0, loadAcc)
        acc += " ";

    }

    // Vertical
    let x = w;
    while (x--) {
        traverse(data, x, 0, 0, 1, loadAcc)
        acc += " ";
    }

    diagonal(0, 0, 1, 1);
    diagonal(w - 1, 0, -1, 1);

    // Reverse everything
    const rev = acc.split("");
    rev.reverse();

    acc = acc + " " + rev.join("");

    const m = acc.match(/XMAS/gm);

    return m.length;
}


export async function solve2(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const w = data[0].length;
    const h = data.length;

    let count = 0;

    for (let x = 0; x < w - 2; x++) {
        for (let y = 0; y < h - 2; y++) {
            const w = getWindow(data, x, y, 3, 3).join(" ");
            if (w.match(/(M\wS\s\wA\w\sM\wS)|(M\wM\s\wA\w\sS\wS)|(S\wS\s\wA\w\sM\wM)|(S\wM\s\wA\w\sS\wM)/)) {
                count++
            }
        }
    }

    return count;
}