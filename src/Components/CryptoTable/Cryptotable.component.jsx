import {
  Container,
  createTheme,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Showerror from "../UI/Error/ShowError.component";
import Cointable from "../UI/Table/Table.component";

//creating rows Data
function createData(
  name,
  logo,
  price,
  change24h,
  change7dPercentage,
  change24hPercentage
) {
  // const change7d = price - sparkline.price[0];
  const change7d = price / (1 + change7dPercentage / 100);
  return {
    name,
    logo,
    price,
    change24h,
    change7d,
    change7dPercentage,
    change24hPercentage,
  };
}

function Cryptotable() {
  //setting up coin Data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // async function to fetch coin data
  const fetchCryptoData = async () => {
    try {
      //setting the loading true until fetching operation completes
      setLoading(true);
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d`
      );
      console.log(data);
      const rows = data.map((coin) =>
        createData(
          coin.name,
          coin.image,
          coin.current_price,
          coin.price_change_24h,
          coin.price_change_percentage_7d_in_currency,
          coin.price_change_percentage_24h
          // coin.sparkline_in_7d
        )
      );
      setRows(rows);
      //setting the loading false
      setLoading(false);
    } catch (err) {
      setError(err.message);

      setLoading(false);
    }
  };

  //use effect fetching the table data for the first time
  useEffect(() => {
    fetchCryptoData();
    return () => {};
  }, []);

  //dark theme

  return (
    <>
      <Container>
        {/* if loading show loading cursor  */}
        {loading && <LinearProgress />}
        {error && <Showerror message={error} />}
        {/* shows the coin table */}
        {!loading && !error && <Cointable rows={rows} />}
      </Container>
    </>
  );
}

export default Cryptotable;
