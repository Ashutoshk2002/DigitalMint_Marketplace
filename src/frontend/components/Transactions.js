import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Transactions () {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();

    // Use useEffect to set the transactions state when the location state changes
    React.useEffect(() => {
        const data = localStorage.getItem('transaction');

        setTransactions(data);
        console.log(data);
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
                    {transactions.map((value, index) => (
                        <TableRow key={index}>
                            <TableCell>Block Hash</TableCell>
                            <TableCell>{value.transationsHash}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Transactions;
