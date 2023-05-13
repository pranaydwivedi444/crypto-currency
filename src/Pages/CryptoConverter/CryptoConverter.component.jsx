import React, { useState } from "react";
import axios from "axios";

function CryptoConverter() {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState("");

  const apiKey =
    "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
  const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency}&tsyms=${toCurrency},INR&api_key=${apiKey}`;

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConvert = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        const conversionRate = response.data[toCurrency];
        const result = amount * conversionRate;
        setResult(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <select value={fromCurrency} onChange={handleFromCurrencyChange}>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="LTC">Litecoin (LTC)</option>
      </select>

      <select value={toCurrency} onChange={handleToCurrencyChange}>
        <option value="INR">Indian Rupees (INR)</option>
        <option value="USD">US Dollar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="JPY">Japanese Yen (JPY)</option>
      </select>

      <input type="number" value={amount} onChange={handleAmountChange} />

      <button onClick={handleConvert}>Convert</button>

      <p>{`${amount} ${fromCurrency} = ${result} ${toCurrency}`}</p>
    </div>
  );
}

export default CryptoConverter;
