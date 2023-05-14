import { Pagination } from "@mui/material";
import React from "react";

function PaginationUI({ page, handlePageChange, numberOfPages = 25 }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "1.5rem",
        }}
      >
        <Pagination
          count={numberOfPages}
          color="primary"
          size="large"
          page={page}
          onChange={(e) => handlePageChange(+e.target.textContent)}
        />
      </div>
    </>
  );
}

export default PaginationUI;
