'use client'
import { useState } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import dataVotingSystem from "../../database/SystemVoting.json"
const DayTimeFrame = ({ id }: { id: number }) => {
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell><strong>Card</strong></TableCell>
                    <TableCell><strong>Hours</strong></TableCell>
                    <TableCell><strong>Days</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {dataVotingSystem
                    .filter((data) => data.id === id)
                    .map((data) => (
                    <TableRow key={data.sequencia}>
                        <TableCell>{data.numero}</TableCell>
                        <TableCell>{data.horas ?? '-'}</TableCell>
                        <TableCell>{data.dias ?? '-'}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default DayTimeFrame