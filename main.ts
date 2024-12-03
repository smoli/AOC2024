import {argv} from "node:process";

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
        const {solve1, solve2} = await import(makeDayPath(day, "solution.ts"));
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


        default:
            console.error("ERROR: Unknown command", command);
            help();
    }
}
