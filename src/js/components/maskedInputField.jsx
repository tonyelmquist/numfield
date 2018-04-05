import React from 'react';
import ReactDOM from 'react-dom';

import InputMask from 'react-input-mask';

class MaskedInputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="currency-field">
        <InputMask
          mask={this.props.mask}
          maskChar=" "
          value={this.props.value}
          className="top-mask currency-input"
          onChange={this.props.handleChange}
          onKeyDown={this.props.handleKeyDown}
          onPaste={this.props.handlePaste}
        />
        <InputMask
          mask={this.props.mask}
          maskChar="X"
          value={this.props.value}
          className="bottom-mask currency-input"
          disabled={true}
          alwaysShowMask={true}
        />
        <div className="currency-label">{this.props.currencyPair}</div>
      </div>
    );
  }
}

export default MaskedInputField;
