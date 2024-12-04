import {makeDayFolderName} from "./makeDayFolderName.ts";
import * as path from "jsr:@std/path";

export function makeDayPath(day: number, file: string): string {
    return path.join(makeDayFolderName(day), file);
}