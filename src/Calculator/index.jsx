import { evaluate } from "mathjs";
import { useState } from "react";

export const calculatorRows = [
  ["CE", "C", "<", "*"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["+/-", "0", ".", "="]
];

const operators = {
  "=": (value) => evaluate(value),
  CE: () => "",
  C: () => "",
  "<": (value) => value.slice(0, -1),
  "+/-": (value) => evaluate(String(value)) * -1
}

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");

  const clickHandler = (value) => {
    setInputValue((storedValue) => {      
      if (operators[value]) {
        try {
          return operators[value](storedValue)
        } catch (error) {
          console.error(error)
          return "Error"
        }
      };

      return storedValue + value;
    });
  };

  return (
    <section>
      <h1>Calculator</h1>
      <input value={inputValue} readOnly />
      <div role='grid'>
        {calculatorRows.map((row, index) => (
          <div role='row' key={index}>
            {row.map((button) => (
              <button key={button} onClick={() => clickHandler(button)}>
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Calculator;
