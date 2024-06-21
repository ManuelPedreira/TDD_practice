import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import React from "react";
import Calculator2, { calculatorRows } from "../src/Calculator2";

describe("Calculator", () => {
  beforeEach(() => {
    render(<Calculator2 />);
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

    expect(input.value).toBe("2");
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

    const two = screen.getByText("2");
    fireEvent.click(two);

    const remove = screen.getByText("<");
    fireEvent.click(remove);

    expect(input.value).toBe("1");
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

    expect(input.value).toBe("0");
  });

  it("should change the sign of the input when pressed '+/-'", () => {
    const two = screen.getByText("2");
    fireEvent.click(two);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    const sign = screen.getByText("+/-");
    fireEvent.click(sign);

    expect(input.value).toBe("-2");
  });

  /*   it("should show 'Error' on the input when user performs a non valid operation", () => {
    const two = screen.getByText("2");
    fireEvent.click(two);

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("2");

    const operator = screen.getByText("/");
    fireEvent.click(operator);

    const equals = screen.getByText("=");
    fireEvent.click(equals);

    expect(input.value).toBe("Error");
  }) */

  it("shoud perform and operation and manage corrections from user", () => {
    const input = screen.getByRole("textbox");
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const operator = screen.getByText("x");
    const plus = screen.getByText("+");
    const remove = screen.getByText("<");
    const equals = screen.getByText("=");

    fireEvent.click(two);
    expect(input.value).toBe("2");

    fireEvent.click(operator);
    fireEvent.click(equals);
    expect(input.value).toBe("2");

    fireEvent.click(remove);
    expect(input.value).toBe("2");

    fireEvent.click(plus);
    expect(input.value).toBe("2");

    fireEvent.click(one);
    expect(input.value).toBe("1");

    fireEvent.click(equals);
    expect(input.value).toBe("3");

    fireEvent.click(remove);
    expect(input.value).toBe("3");

    fireEvent.click(one);
    expect(input.value).toBe("1");

    fireEvent.click(plus);
    expect(input.value).toBe("1");

    fireEvent.click(two);
    expect(input.value).toBe("2");

    fireEvent.click(equals);
    expect(input.value).toBe("3");
  });
});
