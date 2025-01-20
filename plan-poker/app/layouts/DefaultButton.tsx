import { Box, Button } from "@mui/material";

export default function DefaultButton({title}:{title: string}){
    return (
        <Box>
            <Button color="primary" variant="contained">{title}</Button>
        </Box>
    )
}