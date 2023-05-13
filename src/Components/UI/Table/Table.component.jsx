import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Cointable({ rows }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead style={{ backgroundColor: "#006FDE" }}>
            <TableRow>
              <TableCell>Coin </TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h Change</TableCell>
              <TableCell align="right">7d Change</TableCell>
              <TableCell align="right">Market Cap</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    src={row.logo}
                    alt={row.name}
                    width="30"
                    style={{ marginBottom: "8" }}
                  />
                  {row.name}
                </TableCell>
                <TableCell align="right">₹{row.price}</TableCell>
                <TableCell align="right">
                  <span
                    style={{
                      color: row.change24h > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {row.change24h}%
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span
                    style={{
                      color: row.change7d > 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {row.change7d}%
                  </span>
                </TableCell>
                <TableCell align="right">{row.cap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Cointable;
