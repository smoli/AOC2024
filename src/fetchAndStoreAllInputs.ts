import {getAllDays} from "./getAllDays.ts";
import {fetchAndStoreInput} from "./fetchAndStoreInput.ts";

export async function fetchAndStoreAllInputs() {
    const days = await getAllDays();

    for (const day of days) {
        await fetchAndStoreInput(day);
        console.log()
    }
}