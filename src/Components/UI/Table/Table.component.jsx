import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import numberWithCommas from "../../../helperFunctions/helperFunction";


function Cointable({ rows }) {
  const tableRowStyles = {
  "&:last-child td, &:last-child th": { border: 0 },
  "&:hover": {
    backgroundColor: "#B3D2F1 ",
    transform: "scale(1.02)",
    boxShadow: " 0 0 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    textShadow: "0.1px 0.1px 0.1px black",
  },
};
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Coin </TableCell>
              <TableCell align="right">Price ₹</TableCell>
              <TableCell align="right">24h Change</TableCell>
              <TableCell align="right">7d Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={tableRowStyles}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <img
                    src={row?.logo}
                    alt={row?.name}
                    width="30"
                    style={{ marginBottom: "8" }}
                  />
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  ₹ {numberWithCommas(row.price.toFixed(2))}
                </TableCell>
                <TableCell align="right">
                  <span
                    style={{
                      color: row.change24h > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {numberWithCommas(row.change24h.toFixed(2))}
                  </span>
                  <span
                    style={{
                      color: row.change24hPercentage > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {` `}
                    {`(${row.change24hPercentage.toFixed(2)})`}%
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span
                    style={{
                      color: row.change7d > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {numberWithCommas(row.change7d.toFixed(2))}
                  </span>
                  <span
                    style={{
                      color: row.change7dPercentage > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {` `}
                    {`(${row.change7dPercentage.toFixed(2)})`}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Cointable;
