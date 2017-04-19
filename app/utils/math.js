/**
 * This function will convert UUID to a random number
 * 
 * This is a pure function which means it will always get
 * the same number for the same input
 * @param  {String} input
 * @param  {Integer} min
 * @param  {Integer} max
 * @return {Integer}
 */
export function convertUUIDToNumber(input, min, max) {
  const lastCharAscii = input[input.length - 1].charCodeAt(0);
  // 48 is the ascii code for 0
  // 122 is the ascii code for z
  return convertRange(lastCharAscii, [48, 122], [min, max]);
}

function convertRange( value, r1, r2 ) {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
