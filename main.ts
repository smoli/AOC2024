import {argv} from "node:process";
import "jsr:@std/dotenv/load";
import {fetchInput} from "./src/fetchInput.ts";
import {run} from "./src/run.ts";
import {watch} from "./src/watch.ts";
import {create} from "./src/create.ts";


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
            console.log(await fetchInput(day));
            break;


        default:
            console.error("ERROR: Unknown command", command);
            help();
    }
}
