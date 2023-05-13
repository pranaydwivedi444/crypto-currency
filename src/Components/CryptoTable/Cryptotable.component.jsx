import {
  Container,
  createTheme,
  LinearProgress,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Cointable from "../UI/Table/Table.component";

function createData(name, logo, price, change24h, sparkline) {
  const change7d = price - sparkline.price[0];
  return { name, logo, price, change24h, change7d };
}

function Cryptotable() {
  //setting up coin Data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`
      );
      console.log(data);
      const rows = data.map((coin) =>
        createData(
          coin.name,
          coin.image,
          coin.current_price,
          coin.price_change_24h,
          // coin.price_change_percentage_7d_in_currency,
          coin.sparkline_in_7d
        )
      );
      setRows(rows);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    return () => {};
  }, []);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          {loading && <LinearProgress />}
          {!loading && <Cointable rows={rows} />}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Cryptotable;
