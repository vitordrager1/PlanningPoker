import {
  Box,
  Typography,
  TypographyPropsVariantOverrides,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { OverridableStringUnion } from "@mui/types";
import { ReactElement } from "react";

interface DefaultTitleProps {
  title: string;
  fontFamily: string;
  variant?: OverridableStringUnion<
    Variant | "inherit",
    TypographyPropsVariantOverrides
  >;
  fontStyle?: string;
}

export default function DefaultTitle({
  title,
  fontFamily,
  variant,
  fontStyle,
}: DefaultTitleProps): ReactElement {
  return (
    <Box>
      <Typography
        fontFamily={fontFamily}
        variant={variant}
        fontStyle={`${fontStyle}`}
      >
        {title}
      </Typography>
    </Box>
  );
}
