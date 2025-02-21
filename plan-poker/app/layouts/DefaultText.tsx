import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

interface DefaultTextProps {
  text: string;
  fontFamily: string;
  size: number;
  fontStyle?: string;
}

export default function DefaultText({
  text,
  fontFamily,
  size,
  fontStyle,
}: DefaultTextProps): ReactElement {
  return (
    <Box>
      <Typography
        fontFamily={fontFamily}
        fontWeight={700}
        fontSize={size}
        fontStyle={fontStyle}
      >
        {text}
      </Typography>
    </Box>
  );
}
