export async function getAllDays() {
    const dir = await Deno.readDir(".");

    const r: number[] = [];

    for await (const entry of dir) {
        if (entry.isDirectory && entry.name.match(/^Day_\d+$/)) {
            r.push(Number(entry.name.split("_")[1]));
        }
    }

    return r.sort((a, b) => a - b);
}