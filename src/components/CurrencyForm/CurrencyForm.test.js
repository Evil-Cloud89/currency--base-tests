import { cleanup, render, screen } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });
  it('should run action callback with proper data on form submit', () => {
    const testCases = [
      { amountTest: "100", fromTest: "PLN", toTest: "USD" },
      { amountTest: "20", fromTest: "USD", toTest: "PLN" },
      { amountTest: "200", fromTest: "PLN", toTest: "USD" },
      { amountTest: "345", fromTest: "USD", toTest: "PLN" },
    ];
    
    for (let { amountTest, fromTest, toTest } of testCases) {
      const action = jest.fn();
  
      // render component
      render(<CurrencyForm action={action} />);
  
      // find “convert” button
      const submitButton = screen.getByText('Convert');
  
      // find fields elems
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');
  
      // set test values to fields
      userEvent.type(amountField, amountTest);
      userEvent.selectOptions(fromField, fromTest);
      userEvent.selectOptions(toField, toTest);
  
      // simulate user click on "convert" button
      userEvent.click(submitButton);
  
      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: + amountTest, from: fromTest, to: toTest });
    
      // unmount component
      cleanup();
    };
  });
});