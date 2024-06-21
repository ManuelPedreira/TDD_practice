/* 
Function that accepts two strings (from, to) and returns a boolean:
Examples:
  - "BAL" to "LIB" returns true
  - "CON" to "JUU" returns false
  - "XBOX" to "XXBO" returns false
  - "XBOX" to "XOBX" returns true
  - "MMM" to "MID" returns false
  - "AA" to "MID" returns false
*/

export const canReconfigure = (to, from) => {
  if (typeof to !== "string" || typeof from !== "string") {
    throw new Error("Requieres two string parameters");
  }

  if (to.length !== from.length) return false;
  if (new Set(to).size !== new Set(from).size) return false;

  const transformations = {};
  for (let i = 0; i < to.length; i++) {
    const fromLetter = from[i];
    const toLetter = to[i];

    const storedLetter = transformations[toLetter];
    if (storedLetter && storedLetter !== fromLetter) return false;

    transformations[toLetter] = fromLetter;
  }

  return true;
};
