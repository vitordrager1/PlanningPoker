"use client";
import { useState, Fragment, ReactElement } from "react";
import { addUserSessionRoom } from "@/services/firebase/rooms";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import useVoteOptions from "@/hooks/use-vote-options";
import { useSession } from "next-auth/react";
import { ISessionRoom } from "@/models/types";

export default function CreateRoomForm(): ReactElement {
  const { data: session, status } = useSession();
  const [nameRoom, setNameRoom] = useState("");
  const [selectedVoteOption, setSelectedVoteOption] = useState("");
  const { voteOptions, loading } = useVoteOptions();

  //TODO: Ajustar este ponto
  if (status === "loading") {
    return <Box>Carregando...</Box>;
  }

  const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameRoom(event.target.value); //event vem sempre em string
  };

  const handleSelectVoteOption = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedVoteOption(event.target.value);
  };

  const handleCreateRoom: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (!session?.user?.id) {
      console.error("User not logged.", session);
      return;
    }

    try {
      const res = await fetch("/api/firebase/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameRoom: nameRoom,
          voteOptionId: selectedVoteOption,
          userId: session?.user?.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        return (window.location.href = "/rooms/" + data.roomId);
      }
    } catch (err) {
      console.error("Undefined Error:", err);
    }
  };

  return (
    <form onSubmit={handleCreateRoom}>
      <TextField
        id="name-room"
        label="Room name"
        variant="outlined"
        autoComplete="off"
        required
        margin="normal"
        onChange={handleChangeRoomName}
        fullWidth
      ></TextField>

      <TextField
        select
        label="Voting system"
        value={selectedVoteOption}
        helperText="Please select your voting system"
        margin="normal"
        onChange={handleSelectVoteOption}
        required
        fullWidth
        disabled={loading}
      >
        {voteOptions.length > 0 ? (
          voteOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.description}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="Carregando opções...">
            Carregando opções...
          </MenuItem>
        )}
      </TextField>

      <Button
        variant="contained"
        fullWidth
        type="submit"
        sx={{
          marginTop: "2rem",
          color: "var(--ligth-green-forest)",
          background: "var(--dark-green-forest)",
        }}
      >
        Submit
      </Button>
    </form>
  );
}
