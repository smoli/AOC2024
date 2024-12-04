import {year} from "./year.ts";

export async function fetchInput(day: number): Promise<string> {

    if (!Deno.env.get("session")) {
        return "";
    }

    const cookies = ["session"]
    const headers = new Headers();

    headers.append("cookie", cookies.map(c => `${c}=${Deno.env.get(c)}`).join(";"));

    const r = await fetch(`https://adventofcode.com/${year()}/day/${day}/input`, {
        headers
    });

    if (r.status === 200) {
        let text = await r.text();

        text = text.replace(/(.*)\n*$/, "$1");

        return text;

    } else {
        console.log(r);
        console.log(await r.text());
    }


    return "";
}