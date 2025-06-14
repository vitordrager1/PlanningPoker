"use client";
import { Box, Container, Button } from "@mui/material";
import { Fragment, useMemo } from "react";
import ButtonCopyIdRoom from "@/components/Buttons/ButtonCopyIdRoom";
import CardOptions from "@/components/card-options";
import useSessionRoom from "@/hooks/use-session-room";
import SessionsUsers from "./sessions-users";
import { useSession } from "next-auth/react";
import { updateVoteUserSessionRoom } from "@/services/firebase/rooms";
interface RoomProps {
  roomId: string;
}

export default function RoomDashboard({ roomId }: RoomProps) {
  const { data: session, status } = useSession();

  //TODO:Verificar este ponto
  if (status === "loading" || !session?.user?.id) {
    console.log(status, session);
    return <div>Carregando sessão...</div>;
  }

  //Uso do memorization para evitar re-renderizações desnecessárias
  const userId = useMemo(() => {
    return session?.user?.id || "";
  }, [session?.user?.id]);

  const username = useMemo(() => {
    return session?.user?.name || "";
  }, [session?.user?.name]);

  const { sessions, loading } = useSessionRoom({
    roomId,
    userId: userId,
    username: username,
  });
  //TODO: CRIAR funcionalidade para o host da sala poder revelar e ocultar e limpar todos os votos
  return (
    <Fragment>
      <Container className="flex flex-col">
        <Box className="float-right mt-5 justify-end flex">
          <ButtonCopyIdRoom roomId={roomId} />
        </Box>

        <SessionsUsers sessions={sessions} />

        <CardOptions roomId={roomId} userId={userId} />
      </Container>
    </Fragment>
  );
}
