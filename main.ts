import {argv} from "node:process";
import { debounce } from "jsr:@std/async/debounce";
import {readFileAsLineArray} from "./common/readFileAsLineArray.ts";

function makeDayFolderName(day: number): string {
    return `./Day_${day}`;
}

function makeDayPath(day: number, file: string): string {
    return `${makeDayFolderName(day)}/${file}`
}


async function runSolutionForDay(day: number, actual: boolean): Promise<{ a: any, b: any }> {

    const input = actual ? "actual.txt" : "demo.txt";

    const r = {a: 0, b: 0}

    try {
        const n = Math.floor(Math.random() * 1000000000);
        const {solve1, solve2} = await import(makeDayPath(day, "solution.ts?v=" + n));
        r.a = await solve1(makeDayPath(day, input));
        r.b = await solve2(makeDayPath(day, input));

    } catch (e) {
        console.log(e)
    }

    return r;
}

async function run(day: number, actual: boolean) {
    const result = await runSolutionForDay(day, actual);

    console.group(`Day ${day}`);
    console.log("Puzzle 1: ", result.a);
    console.log("Puzzle 2: ", result.b);
    console.groupEnd();
}



function compare(a: any, b: any): boolean {
    if (typeof b === "string") {
        return `${a}` === b;
    }

    if (typeof b === "number") {
        return Number(a) === b;
    }
}

async function watch(day: number, actual: boolean) {
    const folder = makeDayFolderName(day);

    const demoSolutionsFile = makeDayPath(day, "demoSolutions.txt");
    const demoSolutions = (await readFileAsLineArray(demoSolutionsFile));

    const demoInput = makeDayPath(day, "demo.txt");
    const actualInput = makeDayPath(day, "actual.txt");

    const watcher = Deno.watchFs(folder);

    const debRun = debounce(async () => {
        console.log("\nRerunning...\n\n");

        let actual1 = false;
        let actual2 = false;

        const n = Math.floor(Math.random() * 1000000000);
        const {solve1, solve2} = await import(makeDayPath(day, "solution.ts?v=" + n));

        const demo1 = await solve1(demoInput);
        const demo2 = await solve2(demoInput);
        let result1 = demo1;
        let result2 = demo2;

        if (compare(demoSolutions[0], demo1)) {
            result1 = await solve1(actualInput);
            actual1 = true;
        }

        if (compare(demoSolutions[1], demo2)) {
            result2 = await solve2(actualInput);
            actual2 = true;
        }

        console.group(`Day ${day}`);
        console.log("Puzzle 1:", result1, actual1 ? `(actual) - ${demo1} (demo)` : `(demo)`);
        console.log("Puzzle 2:", result2, actual2 ? `(actual) - ${demo2} (demo)` : "(demo)");
        console.groupEnd();

    }, 1000);


    debRun();

    for await (const event of watcher) {
        await debRun(day, actual);
    }
}


async function folderExists(path: string): Promise<boolean> {
    try {
        const stat = await Deno.lstat(path);
        return true;
    } catch {
        return false;
    }
}

async function create(day: number) {
    const files = ["actual.txt", "demo.txt", "solution.ts"];

    if (await folderExists(makeDayFolderName(day))) {
        console.log(`Solution Folder for Day ${day} already exists. Doing nothing.`);
        return;
    }

    await Deno.mkdir(makeDayFolderName(day));

    for (const file of files) {
        await Deno.copyFile(`./template/${file}`, makeDayPath(day, file));
    }

}


function help() {
    console.group("AOC 2024 - Usage");
    console.log();
    console.group("Commands:");
    console.log();
    console.log("c N\tcreate a new solution template for day N");
    console.log("r N (A)\trun solution for day N. If A is given any value the actual data will be used. Demo otherwise");
    console.log("w N (A)\trun solution for day N everytime one of the files in the respective folder changes.");
    console.log();
}

if (argv.length < 4) {
    help();
} else {
    const command = argv[2];
    const day = Number(argv[3]);
    const actual = !!argv[4];

    switch (command) {

        case "c":
        case "C":
        case "create":
            await create(day);
            break;

        case "r":
        case "R":
        case "run":
            await run(day, actual);
            break;

        case "w":
        case "W":
        case "watch":
            await watch(day, actual);
            break;


        default:
            console.error("ERROR: Unknown command", command);
            help();
    }
}
