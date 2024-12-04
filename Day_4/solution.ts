import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";
import {traverse} from "./traverse.ts";
import {getWindow} from "./getWindow.ts";


export async function solveX(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    let count = 0;

    let acc = "";

    const loadAcc = (c: string, x: number, y: number) => {
        acc += c;

        if (acc.substring(acc.length - 4) === "XMAS") {
            count++;
        }
    }

    const w = data[0].length;
    const h = data.length;

    // Horizontal
    let y = h;
    while (y--) {
        traverse(data, 0, y, 1, 0, loadAcc)
        acc = "";

        traverse(data, w - 1, y, -1, 0, loadAcc)
        acc = "";
    }

    // Vertical
    let x = w;
    while (x--) {
        traverse(data, x, 0, 0, 1, loadAcc)
        acc = "";

        traverse(data, x, h - 1, 0, -1, loadAcc)
        acc = "";
    }

    // TL to BR
    y = 0;
    while (y < h) {
        x = 0;
        if (y === 0) {
            while (x < w) {
                traverse(data, x, y, 1, 1, loadAcc);
                acc = "";
                x++;
            }
        }
        traverse(data, x, y, 1, 1, loadAcc);
        acc = "";
        y++;
    }

   // BR to TL
    y = h - 1;
    while (y >= 0) {
        x = w - 1;
        if (y === h - 1) {
            while (x >= 0) {
                traverse(data, x, y, -1, -1, loadAcc);
                acc = "";
                x--;
            }
        }
        traverse(data, x, y, 1, 1, loadAcc);
        acc = "";
        y--;
    }


    // TR to BL
    y = 0;
    while (y < h) {
        x = w - 1;
        if (y === 0) {
            while (x >= 0) {
                traverse(data, x, y, -1, 1, loadAcc);
                acc = "";
                x--;
            }
        }
        traverse(data, x, y, -1, 1, loadAcc);
        acc = "";
        y++;
    }


    // BL to TR
    y = h - 1;
    while (y >= 0) {
        x = 0;
        if (y === h - 1) {
            while (x < w) {
                traverse(data, x, y, 1, -1, loadAcc);
                acc = "";
                x++;
            }
        }
        traverse(data, x, y, 1, -1, loadAcc);
        acc = "";
        y--;
    }

    return count;

}
export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    let count = 0;

    let acc = "";

    const loadAcc = (c: string, x: number, y: number) => {
        acc += c;
    }

    const w = data[0].length;
    const h = data.length;

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

    // TL to BR
    y = 0;
    while (y < h) {
        x = 0;
        if (y === 0) {
            while (x < w) {
                traverse(data, x, y, 1, 1, loadAcc);
                acc += " ";
                x++;
            }
        }
        traverse(data, x, y, 1, 1, loadAcc);
        acc += " ";
        y++;
    }


    // TR to BL
    y = 0;
    while (y < h) {
        x = w - 1;
        if (y === 0) {
            while (x >= 0) {
                traverse(data, x, y, -1, 1, loadAcc);
                acc += " ";
                x--;
            }
        }
        traverse(data, x, y, -1, 1, loadAcc);
        acc += " ";
        y++;
    }

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