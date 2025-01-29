'use client'
import Image from "next/image";
import { Container, Stack, Box, Button } from "@mui/material";
import DefaultTitle from "./layouts/DefaultTitle";
import DefaultText from "./layouts/DefaultText";
import DefaultButton from "./layouts/DefaultButton";
import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase'; // Importe o Firebase configurado
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Verifica o estado do usuário autenticado
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  // useEffect(() => {
  //   // Busca dados do Firestore
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'rooms'));
  //     const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //     setData(documents);
  //   };

  //   fetchData();
  // }, []);


  return (
    <Container>
      <Stack mt={15}>
        <DefaultTitle title="Start your sprint in the best way!" style="bold" />
        <DefaultText text="easy to use, relaxed and fun." />
        <Box mt={3}>
          <Button variant="contained" href="create-room">
            Create room
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

/*
Adicionar exemplos da funciolidade


*/
