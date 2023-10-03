export function randomHexColor() {
    const chars = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        const idx = Math.floor(Math.random() * 16);
        color += chars[idx];
    }
    return color;
}
