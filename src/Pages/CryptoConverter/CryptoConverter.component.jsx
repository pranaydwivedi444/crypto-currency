import React, { useState } from "react";
import axios from "axios";
import { Container } from "@mui/system";
import Showerror from "../../Components/UI/Error/ShowError.component";
import { Button, LinearProgress, MenuItem, TextField } from "@mui/material";
import "./CryptoConverter.styles.css";
import numberWithCommas from "../../helperFunctions/helperFunction";

//crypto currencies array
const currencies = [
  {
    value: "USD",
    label: "$ DOLLAR",
  },
  {
    value: "EUR",
    label: "€ EURO",
  },
  {
    value: "INR",
    label: "₹ RUPEE",
  },
  {
    value: "JPY",
    label: "¥ YEN",
  },
];

//crypto currencies array
const cryptoValues = [
  {
    value: "BTC",
    label: "Bitcoin (BTC) ฿",
  },
  {
    value: "ETH",
    label: "Ethereum (ETH)",
  },
  {
    value: "LTC",
    label: "Litecoin (LTC)",
  },
];

function CryptoConverter() {
  //from crtpyo currency
  const [fromCurrency, setFromCurrency] = useState("BTC");
  //to real currency
  const [toCurrency, setToCurrency] = useState("INR");
  //setting up loading state
  const [loading, setLoading] = useState(false);
  //setting up amount in currency
  const [amount, setAmount] = useState(1);
  //result will be stored here
  const [result, setResult] = useState("");
  //setting up error
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_CRYPTO_API_KEY;
  const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency}&tsyms=${toCurrency},INR&api_key=${apiKey}`;

  // async function to fetch API for conversion called only on clicking convert
  const fetchConversionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      const conversionRate = response.data[toCurrency];
      const result = amount * conversionRate;
      setResult(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  //handling  from currency change (crypto)
  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
    // fetchConversionData();
  };

  //handling  to currency change (real currency)
  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
    // fetchConversionData();
  };

  //handling amount change
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    // fetchConversionData();
  };

  //handling converion , calling API from here
  const handleConvert = () => {
    fetchConversionData();
  };

  return (
    <>
      {error && <Showerror message={error} />}
      <Container>
        <div className="cryptoconverter__container">
          {/* {   Text Field for Crypto} */}
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue={fromCurrency}
            value={fromCurrency}
            helperText="Please select your cryptocurrency"
            onChange={handleFromCurrencyChange}
            sx={{ padding: "1rem" }}
          >
            {cryptoValues.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* {   Text Field for Currency} */}
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue={toCurrency}
            value={toCurrency}
            helperText="Please select your currency"
            onChange={handleToCurrencyChange}
            sx={{ padding: "1rem" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* {   Text Field for Amount} */}
          <TextField
            id="standard-number"
            label="Amount"
            type="number"
            inputProps={{ min: 1 }}
            InputLabelProps={{
              shrink: true,
            }}
            // margin="normal"
            onChange={handleAmountChange}
            variant="standard"
            value={amount}
            sx={{ padding: "1rem" }}
          />
          {/* {   Button which calls API for  Conversion} */}
          <Button variant="contained" onClick={handleConvert}>
            Convert
          </Button>
          {/* {   Loading} */}

          {loading && <LinearProgress />}

          {/* {   Results} */}
          <p>{`${amount} ${fromCurrency} = ${numberWithCommas(
            result
          )} ${toCurrency}`}</p>
        </div>
      </Container>
    </>
  );
}

export default CryptoConverter;
