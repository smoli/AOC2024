import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";
import consoleSize = Deno.consoleSize;


const EMPTY = ".";


type Map = string[][];

interface Pos {
    x: number,
    y: number,
    freq?: string
}

type AntennaDict = { [key: string]: Pos[] };


function findAntennas(map: Map): AntennaDict {
    const ret: AntennaDict = {}


    const w = map[0].length;
    const h = map.length;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const m = map[y][x];
            if (m !== EMPTY) {
                let bucket = ret[m];

                if (!bucket) {
                    ret[m] = bucket = [];
                }


                bucket.push({x, y, freq: m});
            }
        }
    }


    return ret;
}


function calcAntiNodes(a: Pos, b: Pos, limit: number = 2): Pos[] {

    const v: Pos = {x: b.x - a.x, y: b.y - a.y};

    const ret = [];

    for (let i = 1; i < limit; i++) {
        ret.push({
                x: b.x + i * v.x,
                y: b.y + i * v.y,
            },

            {
                x: a.x - i * v.x,
                y: a.y - i * v.y,
            }
        )
    }

    return ret;
}

const ANTINODE = "#";

function mark(map: Map, pos: Pos, value: string = ANTINODE) {

    if (pos.x < 0 || pos.y < 0 || pos.x >= map[0].length || pos.y >= map.length) {
        return;
    }

    const m = map[pos.y][pos.x];

    // if (m === EMPTY) {
    map[pos.y][pos.x] = value;
    // }
}

function doForPairs(pos: Pos[], callback: (a: Pos, b: Pos) => void) {
    for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < pos.length; j++) {
            if (i > j) {
                callback(pos[i], pos[j]);
            }
        }
    }
}

function countValues(map: Map, value: string = ANTINODE): number {
    const con = map.map(l => l.join("")).join("");

    return (con.match(new RegExp(value, "g"))).length;
}

function print(map: Map) {
    for (let line of map) {
        console.log(line.join(""))
    }
}


export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const map: Map = data.map(l => l.split(""));

    const posDict = findAntennas(map);

    Object.values(posDict)
        .forEach(pos => {
            doForPairs(pos, (a, b) => {
                const anti = calcAntiNodes(a, b);

                anti.forEach(pos => mark(map, pos));
            })
        });

    return countValues(map, ANTINODE);
}


export async function solve2(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const map: Map = data.map(l => l.split(""));

    const posDict = findAntennas(map);

    Object.values(posDict)
        .forEach(pos => {

            if (pos.length > 1) {
                pos.forEach(pos => mark(map, pos));
            }

            doForPairs(pos, (a, b) => {
                const anti = calcAntiNodes(a, b, 100);
                anti.forEach(pos => mark(map, pos));
            })
        });

    return countValues(map, ANTINODE);

}