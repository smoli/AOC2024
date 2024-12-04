import {folderExists} from "./folderExists.ts";
import {makeDayFolderName} from "./makeDayFolderName.ts";
import {fetchInput} from "./fetchInput.ts";
import {makeDayPath} from "./makeDayPath.ts";

export async function create(day: number) {
    let files = ["actual.txt", "demo.txt", "solution.ts", "demoSolutions.txt", "solution.test.ts"];

    if (await folderExists(makeDayFolderName(day))) {
        console.log(`Solution Folder for Day ${day} already exists. Doing nothing.`);
        return;
    }

    await Deno.mkdir(makeDayFolderName(day));

    try {
        const input = await fetchInput(day);

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