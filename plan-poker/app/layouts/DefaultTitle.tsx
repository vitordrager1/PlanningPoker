import { Box, Typography } from "@mui/material"
export default function DefaultTitle({ title, style}: { title: string, style: string }){
    return(
        <Box>
            <Typography fontFamily={"monospace"} variant="h2" fontStyle={`${style}`}>
                {title}
            </Typography>
        </Box>
    )
}