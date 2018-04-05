import React from "react";
import ReactDOM from "react-dom";
import {
  Icon,
  Flag,
  Dropdown
} from "semantic-ui-react";
import Notifications, {notify} from 'react-notify-toast';


import MaskedInputField from "../components/maskedInputField";
import currencyFormats from "../constants/currencyFormats";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyFrom: 'BIF',
      currencyTo: 'BGN',
      value: '',
      mask: '99.9999', // initial format - replaced by currency pair
      numericValue: 0
    };
  }

  componentDidMount = () => {
    this.setState({
      mask: this.getMask(this.state.currencyFrom, this.state.currencyTo) // sets initial currency mask
    });
  };

  getMask = (currencyFrom, currencyTo) => {
    const currencyPair = currencyFrom + currencyTo;
    const mask = currencyFormats[currencyPair].mask;
    return mask;
  };

  setFromCurrency = (e, { value }) => {
    if (value !== this.state.currencyTo) {
      this.setState({
        currencyFrom: value,
        mask: this.getMask(value, this.state.currencyTo)
      });
    }
  };

  setToCurrency = (e, { value }) => {
    if (value !== this.state.currencyFrom) {
      this.setState({
        currencyTo: value,
        mask: this.getMask(this.state.currencyFrom, value)
      });
    }
  };

  handleChange = e => {
    let value = e.target.value;
    if (/\d/.test(value) === false) {
      // regex checks to see if value has a number in it
      this.setState({
        mask: this.getMask(this.state.currencyFrom, this.state.currencyTo),
        numericValue: 0,
        value: ''
      });
      return;
    }
    if (value.indexOf('0') === 0) {
      const newMask = '9.' + this.state.mask.split('.')[1]; // if 0 is entered, changes input mask to have just one integer field
      this.setState({ mask: newMask });
    }
    this.setState({ value: value, numericValue: parseFloat(value) });
  };

  handleKeyDown = e => {
    if (e.keyCode === 9) {
      // if tab pressed
      this.addZeroes();
      e.preventDefault();
    } else if (e.keyCode === 190) {
      // if '.' is pressed, check to see if the integer value is shorter than the mask and change appropriately
      if (/\d/.test(this.state.value) === false) {
        // if there is nothing in the field and '.' is pressed, enter a zero
        const newMask = '9.' + this.state.mask.split('.')[1];
        this.setState({ value: '0.', numericValue: 0 });
      } else {
        const integerValue = this.state.value.split('.')[0].replace(/ /g, '');
        const newMask =
          '9'.repeat(integerValue.length) + '.' + this.state.mask.split('.')[1]; // change the integer half of the mask to be as long as the entered number before the '.'
        this.setState({ mask: newMask, value: integerValue });
      }
    }
  };

  addZeroes = () => {
    const currentValue = this.state.value;
    if (/\d/.test(currentValue) === false) return; // checks to see if there are any numbers in the field yet - if not, do nothing
    const newValue = currentValue.replace(/ /g, '0'); // masked value has spaces as placeholders, so just replace with zeroes
    this.setState({ value: newValue });
  };

  handlePaste = e => {
    const pastedValue = e.clipboardData.getData('Text');
    if (/\d/.test(pastedValue.replace('.', '')) === false) { // if not a number alert inappropriate input
      notify.show('Pasted value is not appropriate for this field!', 'warning', 1500);
      e.preventDefault();
      return;
    }
    if (pastedValue.indexOf('.') !== -1) {
      if (
        pastedValue.split('.')[0].length > this.state.mask.split('.')[0].length // if integer side of input larger than allowed alert inappropriate input
      ) {
        notify.show('Pasted value is not appropriate for this field!', 'warning', 1500);
        e.preventDefault();
        return;
      }
    }
  };

  swapCurrencies = () => {
    this.setState({
      currencyFrom: this.state.currencyTo,
      currencyTo: this.state.currencyFrom,
      mask: this.getMask(this.state.currencyTo, this.state.currencyFrom)
    });
  };

  dropdownOptions = () => {
    return [
      {
        value: 'BGN',
        text: (
          <span>
            <Flag name="bulgaria" /> BGN
          </span>
        )
      },
      {
        value: 'BHD',
        text: (
          <span>
            <Flag name="bahrain" /> BHD
          </span>
        )
      },
      {
        value: 'BIF',
        text: (
          <span>
            <Flag name="burundi" /> BIF
          </span>
        )
      }
    ];
  };

  render() {
    return (
      <div className="currency-container">
        <Notifications />
        <div className="selection-options">
          <Dropdown
            options={this.dropdownOptions()}
            value={this.state.currencyFrom}
            onChange={this.setFromCurrency}
            className="currency-selector"
          />

          <Icon
            name="exchange"
            onClick={this.swapCurrencies}
            className="currency-button"
          />

          <Dropdown
            options={this.dropdownOptions()}
            value={this.state.currencyTo}
            onChange={this.setToCurrency}
            className="currency-selector"
          />
        </div>
        <div>
          <MaskedInputField
            mask={this.state.mask}
            value={this.state.value}
            handleChange={this.handleChange}
            handleKeyDown={this.handleKeyDown}
            handlePaste={this.handlePaste}
            currencyPair={this.state.currencyFrom + this.state.currencyTo}
          />
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
