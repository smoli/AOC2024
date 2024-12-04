import {argv} from "node:process";
import "jsr:@std/dotenv/load";
import {run} from "./src/run.ts";
import {watch} from "./src/watch.ts";
import {create} from "./src/create.ts";
import {fetchAndStoreInput} from "./src/fetchAndStoreInput.ts";
import {year} from "./src/year.ts";


function title() {
    console.log();
    console.log("AOC - Overengineered tool to do advent of code.");
    console.log("\trunning for", year());
    console.log("\tby Stephan Smola, 2024");
    console.log();
}

function help() {
    console.group("Commands:");
    console.log();
    console.log("c N\tcreate a new solution template for day N");
    console.log("r N\trun solution for day N.");
    console.log("w N\trun solution for day N everytime one of the files in the respective folder changes.");
    console.log("i N\ttry to load input data for day. Make sure to provide session cookie in .env-file.");
    console.log();
}

title();

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
            await fetchAndStoreInput(day);
            break;


        default:
            console.error("Unrecognized command", command);
            help();
    }

    console.log();
}
