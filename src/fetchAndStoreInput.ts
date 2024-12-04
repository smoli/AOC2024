import {fetchInput} from "./fetchInput.ts";
import {makeDayPath} from "./makeDayPath.ts";

export async function fetchAndStoreInput(day: number) {
    const input = await fetchInput(day);

    if (!input) {
        console.log("Input could not be loaded. Make sure the day is active and the session cookie is correctly set in .env");
    }

    const path = makeDayPath(day, "actual.txt");

    await Deno.writeTextFile(path, input, {create: true});

    console.log("Input data successfully loaded for day", day);
}