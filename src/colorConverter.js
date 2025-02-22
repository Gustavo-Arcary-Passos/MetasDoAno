function paraRGB(cor) {
    if (cor.startsWith("#")) {
        return hexParaRGB(cor);
    } else if (cor.startsWith("rgb")) {
        return rgbParaRGB(cor);
    } else if (cor.startsWith("hsl")) {
        return hslParaRGB(cor);
    } else {
        throw new Error("Formato de cor não suportado!");
    }
}

// 🔹 Converte HEX → RGB
function hexParaRGB(hex) {
    hex = hex.replace("#", "");
    let r, g, b;
    
    if (hex.length === 3) { // Caso seja do tipo #abc
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else { // Caso seja do tipo #aabbcc
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }

    return `rgb(${r}, ${g}, ${b})`;
}

// 🔹 Converte RGB → RGB (apenas retorna o formato correto)
function rgbParaRGB(rgb) {
    return rgb.replace(/\s+/g, ''); // Remove espaços extras
}

// 🔹 Converte HSL → RGB
function hslParaRGB(hsl) {
    let [h, s, l] = hsl.match(/\d+(\.\d+)?/g).map(Number);
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r, g, b;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function reduzirRGB(rgb, percentual) {
    // Extrai os números do formato rgb(r, g, b)
    let [r, g, b] = rgb.match(/\d+/g).map(Number);

    // Calcula o novo valor baseado no percentual
    r = Math.round(r * (percentual / 100));
    g = Math.round(g * (percentual / 100));
    b = Math.round(b * (percentual / 100));

    return `rgb(${r}, ${g}, ${b})`;
}

function addColors(colorOne, colorTwo) {
    let [rOne, gOne, bOne] = colorOne.match(/\d+/g).map(Number);
    let [rTwo, gTwo, bTwo] = colorTwo.match(/\d+/g).map(Number);
    return `rgb(${rOne + rTwo}, ${gOne + gTwo}, ${bOne + bTwo})`
}

function mixedRGBColors(colorOne, colorTwo, percentual) {
    let rest = 100 - percentual;
    const colorOnePart = reduzirRGB(colorOne,percentual)
    const colorTwoPart = reduzirRGB(colorTwo,rest)
    return addColors(colorOnePart,colorTwoPart)
}