import {argv} from "node:process";
import {debounce} from "jsr:@std/async/debounce";
import {readFileAsLineArray} from "./common/readFileAsLineArray.ts";
import "jsr:@std/dotenv/load";

function makeDayFolderName(day: number): string {
    return `./Day_${day}`;
}

function makeDayPath(day: number, file: string): string {
    return `${makeDayFolderName(day)}/${file}`
}

async function run(day: number, actual: boolean) {
    const inputs = await getInputsForDay(day);
    const result = await runSolutions(day, inputs);

    console.group(`Day ${day}`);
    printRes(result);
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


interface IRunResult {
    actual1: boolean;
    actual2: boolean;
    result1: any;
    result2: any;
    demo1: any;
    demo2: any;
}

async function runSolutions(day: number, inputs: IInputs): Promise<IRunResult> {
    let actual1 = false;
    let actual2 = false;

    const n = Math.floor(Math.random() * 1000000000);

    try {
        const {solve1, solve2} = await import(makeDayPath(day, "solution.ts?v=" + n));

        const demo1 = await solve1(inputs.demoInput);
        const demo2 = await solve2(inputs.demoInput);
        let result1 = demo1;
        let result2 = demo2;

        if (compare(inputs.demoSolutions[0], demo1)) {
            result1 = await solve1(inputs.actualInput);
            actual1 = true;
        }

        if (compare(inputs.demoSolutions[1], demo2)) {
            result2 = await solve2(inputs.actualInput);
            actual2 = true;
        }

        return {
            actual1, actual2, demo1, demo2, result1, result2
        }
    } catch (e) {
        console.error("ERROR RUNNING SOLUTION");
        console.log(e);
        console.groupEnd();
    }
}


interface IInputs {
    demoSolutions: string[],
    demoInput: string,
    actualInput: string
}

async function getInputsForDay(day: number): Promise<IInputs> {
    const demoSolutionsFile = makeDayPath(day, "demoSolutions.txt");
    const demoSolutions = (await readFileAsLineArray(demoSolutionsFile));

    const demoInput = makeDayPath(day, "demo.txt");
    const actualInput = makeDayPath(day, "actual.txt");

    return { demoSolutions, demoInput, actualInput }
}

function printRes(res: IRunResult) {
    console.log("Puzzle 1:", res.result1, res.actual1 ? `(actual) - ${res.demo1} (demo)` : `(demo)`);
    console.log("Puzzle 2:", res.result2, res.actual2 ? `(actual) - ${res.demo2} (demo)` : "(demo)");
}


async function watch(day: number, actual: boolean) {
    const folder = makeDayFolderName(day);

    const inputs = await getInputsForDay(day);

    const watcher = Deno.watchFs(folder);

    const debRun = debounce(async () => {
        console.group(`
Rerunning Day ${day}
===================================================================================
`);
            const res = await runSolutions(day, inputs);
            printRes(res);

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


async function getInput(day: number): Promise<string> {

    if (!Deno.env.get("session")) {
        return "";
    }

    const cookies = ["session"]
    const headers = new Headers();

    headers.append("cookie", cookies.map(c => `${c}=${Deno.env.get(c)}`).join(";"));

    const r = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
        headers
    });

    if (r.status === 200) {
        return await r.text();
    } else {
        console.log(r);
        console.log(await r.text());
    }


    return "";
}

async function create(day: number) {
    let files = ["actual.txt", "demo.txt", "solution.ts", "demoSolutions.txt", "solution.test.ts"];

    if (await folderExists(makeDayFolderName(day))) {
        console.log(`Solution Folder for Day ${day} already exists. Doing nothing.`);
        return;
    }

    await Deno.mkdir(makeDayFolderName(day));

    try {
        const input = await getInput(day);

        if (input) {
            await Deno.writeTextFile(makeDayPath(day, "actual.txt"), input, {create: true});
            files = files.filter(f => f !== "actual.txt");
        }
    } catch (e) {
        console.log(e);
    }


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
    console.log("r N\trun solution for day N.");
    console.log("w N\trun solution for day N everytime one of the files in the respective folder changes.");
    console.log();
}

if (argv.length < 4) {
    help();
} else {
    const command = argv[2];
    const day = Number(argv[3]);

    switch (command) {

        case "c":
        case "C":
        case "create":
            await create(day);
            break;

        case "r":
        case "R":
        case "run":
            await run(day);
            break;

        case "w":
        case "W":
        case "watch":
            await watch(day);
            break;

        case "i":
            console.log(await getInput(day));
            break;


        default:
            console.error("ERROR: Unknown command", command);
            help();
    }
}
