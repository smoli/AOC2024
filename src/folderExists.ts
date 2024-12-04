export async function folderExists(path: string): Promise<boolean> {
    try {
        const stat = await Deno.lstat(path);
        return true;
    } catch {
        return false;
    }
}