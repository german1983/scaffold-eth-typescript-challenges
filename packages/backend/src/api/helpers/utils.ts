export function brigthenColor(color: string, brigtness: any) {
    var result: any = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    var r_delta = Math.floor(r * brigtness);
    var g_delta = Math.floor(g * brigtness);
    var b_delta = Math.floor(b * brigtness);

    if (r + r_delta > 255) r_delta = 255 - r;
    if (g + g_delta > 255) g_delta = 255 - g;
    if (b + b_delta > 255) b_delta = 255 - b;

    r = r + r_delta;
    g = g + g_delta;
    b = b + b_delta;

    console.log(r, g, b);

    console.log('' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));

    return '' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}