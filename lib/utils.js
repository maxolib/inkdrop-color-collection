"use babel"

export const componentToHex = (c) => {
	const hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r, g, b) => {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

export const contrastColor = (hex) => {
	const {r, g, b} = hexToRgb(hex)
	if(r && g && b){
		const ratio = (r + g + b)/3
		return ratio < 128 ? "white" : "black"
	}
	return "white"
}