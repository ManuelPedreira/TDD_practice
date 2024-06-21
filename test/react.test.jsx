import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import React from "react";
import Calculator from "../src/Calculator";

export const calculatorRows = [
  ["CE", "C", "<", "*"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["+/-", "0", ".", "="]
];

describe("Calculator", () => {
  beforeEach(() => {
    render(<Calculator />);
  });
  afterEach(cleanup);

  /* it("should render", () => {
    render(<Calculator />);
  }); */

  it("should render title correctly", () => {
    screen.getByText("Calculator");
  });

  it("should render numbers and operators", () => {
    calculatorRows.flat(1).forEach((text) => {
      screen.getByText(text);
    });
  });

  it("should render elements in 5 rows", () => {
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(5);
  });

  it("should render an input", () => {
    screen.getByRole("textbox");
  });

  it("should user input after clicking a number", () => {
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");
  });

  it("should user input after clicking several number", () => {
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");

    const two = screen.getByText("2");
    fireEvent.click(two);

    expect(input.value).toBe("12");
  });

  it("should user input after clicking several number and operations", () => {
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    const two = screen.getByText("2");
    fireEvent.click(two);

    expect(input.value).toBe("1+2");
  });

  it("should calculate based on user input and show the result", () => {
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    const two = screen.getByText("2");
    fireEvent.click(two);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(input.value).toBe("3");
  });

  it("should remove a character from the input when pressed '<'", () => {
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    const two = screen.getByText("2");
    fireEvent.click(two);

    const remove = screen.getByText("<");
    fireEvent.click(remove);

    expect(input.value).toBe("1+");
  });

  it("should clear the result when pressed 'CE'", () => {
    const one = screen.getByText("1");
    fireEvent.click(one);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("1");

    const plus = screen.getByText("+");
    fireEvent.click(plus);

    const two = screen.getByText("2");
    fireEvent.click(two);

    const remove = screen.getByText("CE");
    fireEvent.click(remove);

    expect(input.value).toBe("");
  });

  it("should change the sign of the input when pressed '+/-'", () => {
    const two = screen.getByText("2");
    fireEvent.click(two);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    const sign = screen.getByText("+/-");
    fireEvent.click(sign);

    expect(input.value).toBe("-2");
  })

  it("should show 'Error' on the input when user performs a non valid operation", () => {
    const two = screen.getByText("2");
    fireEvent.click(two);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    const operator = screen.getByText("/");
    fireEvent.click(operator);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(input.value).toBe("Error");
  })
});
