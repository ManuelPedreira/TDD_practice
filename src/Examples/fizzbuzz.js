/* Function that accepts a number as a parameter and returns:
- "fizz" if the number is a multiple of 3
- "buzz" if the number is a multiple of 5
- "fizzbuzz" if the number is a multiple of both 3 and 5
- the number itself if none of the above cases apply
*/

export const fizzbuzz = (inputNumber) => {
  if (typeof inputNumber !== "number" || isNaN(inputNumber)) {
    throw new Error("A number must be provided as parameter");
  }

  const multiples = { 3: "fizz", 5: "buzz" };

  let outputText = "";
  Object.entries(multiples).forEach(([multiplier, word]) => {
    if (inputNumber % multiplier === 0) {
      outputText += word;
    }
  });

  return outputText !== "" ? outputText : inputNumber;
};
