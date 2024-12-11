export function sumStringsToTwoDecimals(...strings) {
  // Convert the strings to numbers, round to 2 decimal places, and sum them
  const sum = strings.reduce((acc, str) => {
    const num = parseFloat(str);
    if (!isNaN(num)) {
      // Round to 2 decimal places and add to the accumulator
      acc += Math.round(num * 100) / 100;
    }
    return acc;
  }, 0);

  // Convert the sum to a fixed 2 decimal places string
  const fixedSum = sum.toFixed(2);

  // Add commas as thousand separators
  const parts = fixedSum.split("."); // Separate integer and decimal parts
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Format integer part with commas

  // Join the integer and decimal parts back together
  return parts.join(".");
}
