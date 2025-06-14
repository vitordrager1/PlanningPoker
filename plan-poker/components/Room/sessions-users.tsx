import { Box, Typography } from "@mui/material";
import Card from "../Card";

interface SessionUsersProps {
  sessions: any[];
}

export default function SessionsUsers({ sessions }: SessionUsersProps) {
  return (
    <Box
      className="grid gap-8 p-4 rounded-lg mt-10"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      }}
    >
      {sessions.map((user) => {
        return (
          <Box
            key={user.userId}
            className="flex flex-col items-center justify-center min-w-32 min-h-44 p-4 rounded-lg"
          >
            <Box className="min-h-14">
              <Typography fontSize={20}>
                {typeof user.name === "string" && user.name.substring(0, 13)}
              </Typography>
            </Box>
            <Card nrCard={user.vote}></Card>
          </Box>
        );
      })}
    </Box>
  );
}
