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

export const toRadians = (degrees) => degrees * (Math.PI / 180);
export const toDegrees = (radians) => radians * (180 / Math.PI);

export const lineIntersectsRectange = (p1, p2, rectangle) => {
  let minX = p1.x;
  let maxX = p2.x;

  if (p1.x > p2.x) {
      minX = p2.x;
      maxX = p1.x;
  }

  if (maxX > rectangle.left + rectangle.width)
      maxX = rectangle.left + rectangle.width;

  if (minX < rectangle.left)
      minX = rectangle.left;

  if (minX > maxX)
      return false;

  let minY = p1.y;
  let maxY = p2.y;

  let dx = p2.x - p1.x;

  if (Math.abs(dx) > 0.0000001) {
      let a = (p2.y - p1.y) / dx;
      let b = p1.y - a * p1.x;
      minY = a * minX + b;
      maxY = a * maxX + b;
  }

  if (minY > maxY) {
      let tmp = maxY;
      maxY = minY;
      minY = tmp;
  }

  if (maxY > rectangle.top + rectangle.height)
      maxY = rectangle.top + rectangle.height;

  if (minY < rectangle.top)
      minY = rectangle.top;

  if (minY > maxY)
      return false;

  return true;
}

export const getLineSecondPoint = (p, angle, distance) => ({
  x: p.x + Math.cos(toRadians(angle)) * distance,
  y: p.y + Math.sin(toRadians(angle)) * distance,
});

export const addPoints = (p1, p2) => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
});
