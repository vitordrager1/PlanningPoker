import { MenuItem, TextField } from "@mui/material";
import { IVoteOption } from "@/models/types";
import { ReactElement } from "react";

interface VoteOptionsProps {
  callback: () => void;
}

export default function VoteOptions({
  callback,
}: VoteOptionsProps): ReactElement {
  const VoteOptions: IVoteOption[] = [
    {
      id: 1,
      title: "Fibonacci",
      description: "Fibonacci (0, 1, 2, 3, 5, 8, 13, 21)",
    },
    {
      id: 2,
      title: "Numeric",
      description: "Numeric (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)",
    },
  ];
  return (
    <TextField
      id="outlined-select-currency"
      select
      label="Voting system"
      defaultValue="1"
      helperText="Please select your voting system"
      margin="normal"
      onChange={callback}
      required
      fullWidth
    >
      {VoteOptions.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.description}
        </MenuItem>
      ))}
    </TextField>
  );
}
