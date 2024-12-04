export function year(): number {
    const year = Deno.env.get("year");

    return year || 2024

}