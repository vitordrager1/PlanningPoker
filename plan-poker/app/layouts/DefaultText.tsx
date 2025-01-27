import { Box, Typography } from "@mui/material";
export default function DefaultTitle({ text }: { text: string }) {
  return (
    <Box>
      <Typography fontFamily={"monospace"} fontWeight={700}>
        {text}
      </Typography>
    </Box>
  );
}
