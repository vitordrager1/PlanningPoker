import { Fragment } from "react";
import { useParams } from "next/navigation";
import RoomDashboard from "@/components/Room/room-dashboard";

interface Props {
  params: {
    roomId: string;
  };
}

export default async function Room({ params }: Props) {
  const roomId = await params.roomId;
  //TODO: Valdar se a sala existe
  return <RoomDashboard roomId={roomId} />;
}
