function numberToHexColor(num: number) {
  // Normalize the number to a range (e.g., 0 to 16777215)
  const maxColorValue = 0xffffff; // 16777215 in decimal
  const normalizedNum = num % (maxColorValue + 1);

  // Convert to a hex string and pad with zeros if necessary
  const hexColor = normalizedNum.toString(16).padStart(6, '0');

  // Return the formatted color code
  return `#${hexColor}`;
}

export { numberToHexColor };
