import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("transactions");
    console.log(JSON.parse(data));
    if (data) {
      const parsedData = JSON.parse(data);
      setTransactions(parsedData);
    }
  }, []);

  return (
    <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "2rem" }}>
      <TableContainer component={Paper} style={{ border: "1px solid #ddd" }}>
        <Table aria-label="transaction table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Block Hash</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((value, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{value.blockHash}</TableCell>
                <TableCell>{value.from}</TableCell>
                <TableCell>{value.to}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Transactions;
