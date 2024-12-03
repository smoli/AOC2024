export function unzip(data: string[string[]]) {
    return data.reduce((a, c) => {
        c.forEach((v, i) => {
            a[i].push(v)
        });

        return a;
    }, (new Array(data[0].length)).fill(1).map(_ => []))
}