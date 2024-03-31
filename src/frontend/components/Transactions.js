import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Transactions () {
    const [transactions, setTransactions] = useState({});
    const location = useLocation();

    // Use useEffect to set the transactions state when the location state changes
    React.useEffect(() => {
        if (location.state) {
            setTransactions(location.state);
        }
    }, [location.state]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="transaction table">
                <TableHead>
                    <TableRow>
                        <TableCell>Attribute</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Block Hash</TableCell>
                        <TableCell>{transactions.blockHash}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Transactions;
