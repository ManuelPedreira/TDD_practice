import { useState } from "react";
import { chain, MathJsChain } from "mathjs";
import "./styles.css";

export const calculatorRows = [
  ["CE", "C", "<", "x"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["+/-", "0", ".", "="],
];

type chainOperationType = Record<
  string,
  (
    buffer: number,
    operator: MathJsChain<number>
  ) => [newBuffer: number, newOperator: MathJsChain<number> | undefined]
>;

const chainOperation: chainOperationType = {
  "": (buffer) => [buffer, chain(buffer)],
  "=": (buffer, operator) => [operator.done(), operator],
  "+": (buffer, operator) => [operator.add(buffer).done(), operator.add(buffer)],
  "-": (buffer, operator) => [operator.subtract(buffer).done(), operator.subtract(buffer)],
  x: (buffer, operator) => [operator.multiply(buffer).done(), operator.multiply(buffer)],
  "÷": (buffer, operator) => [operator.divide(buffer).done(), operator.divide(buffer)],
};
const chainOperationsList = Object.keys(chainOperation);

type bufferModificatorType = Record<string, (buffer: string) => string>;
const bufferModificator: bufferModificatorType = {
  "<": (buffer) => String(buffer).slice(0, -1),
  ".": (buffer) => buffer + ".",
  "+/-": (buffer) => String(Number(buffer) * -1),
};
const bufferModificatorsList = Object.keys(bufferModificator);

const Calculator2 = () => {
  const [buffer, setBuffer] = useState<string>("0");
  const [operatorChain, setOperatorChain] = useState<MathJsChain<number>>();
  const [storedSimbol, setStoredSimbol] = useState<string>("");
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("");
  const [isResult, setIsResult] = useState<boolean>(false);

  const clickHandler = (keyPressed: string) => {
    if (keyPressed === "C" || (isResult && keyPressed === "CE")) clear();
    if (keyPressed === "CE" && buffer !== "0") setBuffer("0");

    if (chainOperationsList.includes(keyPressed)) insertOperator(keyPressed);

    if (bufferModificatorsList.includes(keyPressed) && !isResult) moddifyBuffer(keyPressed);

    if (!isNaN(Number(keyPressed))) writeBuffer(keyPressed);

    if (!bufferModificatorsList.includes(keyPressed)) setLastKeyPressed(keyPressed);
  };

  const insertOperator = (keyPressed: string) => {
    if (!chainOperationsList.includes(lastKeyPressed) || lastKeyPressed === "=") {
      const [newBuffer, newOperatorChain] = chainOperation[storedSimbol](
        Number(buffer),
        operatorChain ? operatorChain : chain(Number(buffer))
      );
      setStoredSimbol(keyPressed);
      setBuffer(String(newBuffer));
      setOperatorChain(newOperatorChain);
      setIsResult(true);
    }
    setStoredSimbol(keyPressed);
  };

  const moddifyBuffer = (keyPressed: string) => {
    const newBuffer = bufferModificator[keyPressed](buffer);
    setBuffer(newBuffer);
  };

  const writeBuffer = (keyPressed: string) => {
    if (lastKeyPressed === "=") clear();

    setBuffer((currentBuffer) =>
      isResult || currentBuffer === "0" ? keyPressed : currentBuffer + keyPressed
    );
    setIsResult(false);
  };

  const clear = () => {
    setBuffer("0");
    setStoredSimbol("");
    setOperatorChain(undefined);
    setIsResult(false);
  };

  const buttonColorStyle = (key: string): string => {
    if (key === "=") return "buttonEqual";
    if (isNaN(Number(key)) && key !== "+/-" && key !== ".") return "buttonDark";
    return "";
  };

  return (
    <section>
      <h1>Calculator</h1>
      {/* <p>{`${operatorChain?.done()} ${storedSimbol}`}</p> */}
      <input value={buffer} readOnly />
      <div role="grid">
        {calculatorRows.map((row, index) => (
          <div role="row" key={index}>
            {row.map((button) => (
              <button
                key={button}
                className={buttonColorStyle(button)}
                onClick={() => clickHandler(button)}
              >
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Calculator2;
