export async function readFileAsLineArray(file: string): Promise<string[]> {
    const data = await Deno.readTextFile(file);

    return data.split("\n");
}