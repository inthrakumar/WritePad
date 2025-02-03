export function nameToHex(input:string) {
    let name = String(input); // Convert numbers to string
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += value.toString(16).padStart(2, "0");
    }
    return color;
}
