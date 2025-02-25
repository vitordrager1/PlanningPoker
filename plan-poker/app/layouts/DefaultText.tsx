import { Box, Typography } from "@mui/material";
import { ReactElement, ReactNode } from "react";

interface DefaultTextProps {
  children: ReactNode;
  fontFamily: string;
  size: number;
  fontStyle?: string;
}

export default function DefaultText({
  children,
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
        {children}
      </Typography>
    </Box>
  );
}
