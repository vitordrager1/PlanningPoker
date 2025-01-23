'use client'
import { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, Button, Box, Typography, Input, TextField } from "@mui/material";

const FormVotingSystem = () => {
  const [selectedSystem, setSelectedSystem] = useState("");
  const votingSystem = [
    {
      id: 1,
      system: 'Fibonacci',
      text: "Fibonacci (0, 1, 2, 3, 5, 8, 13, 21)"
    },
    {
      id: 2,
      system: 'Numeric',
      text: "Numeric (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)"
    }
  ]

  const handleChange = (event) => {
    setSelectedSystem(event.target.value);
  };


  const handleSubmit = (event) => {
      event.preventDefault();
      alert(`Voto selecionado: ${selectedSystem}`);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>

      <Typography variant="h5" gutterBottom>Create your room</Typography>
      <form onSubmit={handleSubmit}>
        <TextField id="name-room" label="Room name" variant="outlined" autoComplete="none" required margin="normal"></TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Voting system"
          defaultValue="1"
          helperText="Please select your voting system"
          margin="normal"
          onChange={handleChange}
          required
        >
          {votingSystem.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
      
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleSubmit} 
          >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormVotingSystem;
