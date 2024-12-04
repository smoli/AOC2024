export function traverse(data: string[],
                         sx: number,
                         sy: number,
                         dx: number,
                         dy: number,
                         callback: (c: string, x?: number, y?: number) => void) {

    let x = sx;
    let y = sy;

    let w = data[0].length;
    let h = data.length;

    while (x >= 0 && x < w && y >= 0 && y < h) {
        callback(data[y][x], x, y);
        y += dy;
        x += dx;
    }
}