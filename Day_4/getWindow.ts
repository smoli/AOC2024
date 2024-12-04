export const getWindow = (data: string[], sx: number, sy: number, w: number, h: number): string[] => {
    const r: string[] = [];

    for (let y = sy; y < sy + h; y++) {
        r.push(data[y].substring(sx, sx + w));
    }

    return r;
}