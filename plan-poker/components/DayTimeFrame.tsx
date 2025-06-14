"use client";
import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import dataVotingSystem from "../../database/SystemVoting.json";

//Refatorar este componente... Esta um lixo.
const DayTimeFrame = ({ id }: { id: number }) => {
  return (
    <Box className="defaultBlue">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className="defaultBlue">Card</Typography>
              </TableCell>
              <TableCell>
                <Typography className="defaultBlue">Hours</Typography>
              </TableCell>
              <TableCell>
                <Typography className="defaultBlue">Days</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataVotingSystem
              .filter((data) => data.id === id)
              .map((data) => (
                <TableRow key={data.sequencia}>
                  <TableCell className="defaultBlue">{data.numero}</TableCell>
                  <TableCell className="defaultBlue">
                    {data.horas ?? " "}
                  </TableCell>
                  <TableCell className="defaultBlue">
                    {data.dias ?? " "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DayTimeFrame;
