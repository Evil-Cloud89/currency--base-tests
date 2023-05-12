import { render, screen, cleanup } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("should render proper information about conversion PLN -> USD", () => {
    const testCases = [
      { fromTest: "PLN", toTest: "USD", amountTest: 5 },
      { fromTest: "PLN", toTest: "USD", amountTest: 79 },
      { fromTest: "PLN", toTest: "USD", amountTest: 125 },
      { fromTest: "PLN", toTest: "USD", amountTest: 400 },
    ];

    for (let { fromTest, toTest, amountTest } of testCases) {
      render(<ResultBox from={fromTest} to={toTest} amount={amountTest} />);

      const conversionResult = (amountTest / 3.5).toFixed(2);

      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(
        `PLN ${amountTest}.00 = $${conversionResult}`
      );
      cleanup();
    }
  });
  it("should render proper information about conversion USD -> PLN", () => {
    const testCases = [
      { fromTest: "USD", toTest: "PLN", amountTest: 5 },
      { fromTest: "USD", toTest: "PLN", amountTest: 51 },
      { fromTest: "USD", toTest: "PLN", amountTest: 200 },
      { fromTest: "USD", toTest: "PLN", amountTest: 266 },
    ];

    for (let { fromTest, toTest, amountTest } of testCases) {
      render(<ResultBox from={fromTest} to={toTest} amount={amountTest} />);

      const conversionResult = (amountTest * 3.5).toFixed(2);

      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(
        `$${amountTest}.00 = PLN ${conversionResult}`
      );
      cleanup();
    }
  });
  it("should render proper information about conversion when both currency are the same", () => {
    const testCases = [
      { fromTest: "USD", toTest: "USD", amountTest: 7 },
      { fromTest: "USD", toTest: "USD", amountTest: 130 },
      { fromTest: "PLN", toTest: "PLN", amountTest: 46 },
      { fromTest: "PLN", toTest: "PLN", amountTest: 7 },
    ];

    for (let { fromTest, toTest, amountTest } of testCases) {
      render(<ResultBox from={fromTest} to={toTest} amount={amountTest} />);

      const renderCurrencyForm = (currency) => {
        if (currency === "USD") {
          return "$";
        } else {
          return "PLN ";
        }
      };

      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(
        `${renderCurrencyForm(fromTest)}${amountTest}.00 = ${renderCurrencyForm(
          toTest
        )}${amountTest}.00`
      );
      cleanup();
    }
  });
  it("should render text when Amount is less than zero", () => {
    const testCases = [
      { fromTest: "USD", toTest: "PLN", amountTest: -1 },
      { fromTest: "PLN", toTest: "USD", amountTest: -140 },
      { fromTest: "PLN", toTest: "PLN", amountTest: -50 },
      { fromTest: "USD", toTest: "USD", amountTest: -8 },
    ];

    for (let { fromTest, toTest, amountTest } of testCases) {
      render(<ResultBox from={fromTest} to={toTest} amount={amountTest} />);

      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent("Wrong value...");

      cleanup();
    }
  });
});