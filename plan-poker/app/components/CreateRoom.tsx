import Image from "next/image";
import { Container, Stack, Box, OutlinedInput, } from "@mui/material";
import DefaultTitle from "../layouts/DefaultTitle";
import DefaultText from "../layouts/DefaultText";
import DefaultButton from "../layouts/DefaultButton";
import { useFormControl } from '@mui/material/FormControl';
import {FormControl, InputLabel, Input} from "@mui/material";



export default function CreateRoom() {

  return (
    <form noValidate autoComplete="off">
        <FormControl sx={{ width: '25ch' }}>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
        </FormControl>
    </form>
  );
}