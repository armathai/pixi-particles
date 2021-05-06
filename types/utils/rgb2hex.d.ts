/**
 * Converts a color as an [R, G, B] array of normalized floats to a hexadecimal number.
 *
 * @example
 * PIXI.utils.rgb2hex([1, 1, 1]); // returns 0xffffff
 * @memberof PIXI.utils
 * @function rgb2hex
 * @param {number[]} rgb - Array of numbers where all values are normalized floats from 0.0 to 1.0.
 * @return {number} Number in hexadecimal.
 */
export declare function rgb2hex(rgb: number[] | Float32Array): number;
