import React from 'react';

interface Currency {
  name: string;
  price: number;
  quantity: number;
}

interface SpreadState {
  currencies: Currency[];
  initialValue: number;
  currentValue: number;
}

class Spread extends React.Component<{}, SpreadState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currencies: [],
      initialValue: 0,
      currentValue: 0,
    };
  }

  componentDidMount() {
    const storedCurrencies = localStorage.getItem('bagItems');
    if (storedCurrencies) {
      const parsedCurrencies = JSON.parse(storedCurrencies);
      this.setState({ currencies: parsedCurrencies });
// 
      const initialValue = parsedCurrencies.reduce(
        (total: number, currency: Currency) => total + currency.price * currency.quantity,
        0,
      );
      this.setState({ initialValue });
      this.fetchCurrencies();
    }
  }

  async fetchCurrencies() {
    const response = await fetch('https://api.coincap.io/v2/assets?limit=100');
    const data = await response.json();
    const { currencies } = this.state;
console.log(currencies)
    const updatedCurrencies = currencies.map((item, index) => {
      const foundCurrency = data.data.find((currency: Currency) => currency.name === item.name);
// console.log(currency )
      if (foundCurrency) {
        return {
          ...item,
          price: foundCurrency.priceUsd,
        };
      }
      return item;
// 

    });
    this.setState({ currencies: updatedCurrencies });
  }

  componentDidUpdate(prevProps: {}, prevState: SpreadState) {
    const { currencies } = this.state;
    if (currencies !== prevState.currencies) {
      const currentValue = currencies.reduce(
        (total: number, currency: Currency) => total + currency.price * currency.quantity,
        0,
      );
      this.setState({ currentValue });
    }
  }

  render() {
    const { initialValue, currentValue } = this.state;
    const difference = initialValue - currentValue;
    const differencePercent = ((difference / initialValue) * 100).toFixed(2);

    return (
      <div className="header">
        <h3>You're Crypto</h3>
        <div className="portfolio">
          <span className="value">{initialValue.toFixed(2)} USD </span>
          <span className={`difference ${difference >= 0 ? 'positive' : 'negative'}`}>
            {currentValue.toFixed(2)} USD ({differencePercent}%)
          </span>
        </div>
      </div>
    );
  }
}

export default Spread;
