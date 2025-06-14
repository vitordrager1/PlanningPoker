import { ISessionRoom } from "@/models/types";

export async function addUserSessionRoom({
  roomId,
  userId,
  username,
}: ISessionRoom) {
  if (!roomId || !userId || !username) {
    return { status: 500, error: "Mandatory" };
  }

  try {
    const res = await fetch("/api/firebase/room-session", {
      method: "POST",
      body: JSON.stringify({
        roomId: roomId,
        userId: userId,
        username: username,
      }),
    });

    const data = await res.json();

    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return { status: 500, error };
  }
}

export async function updateVoteUserSessionRoom({
  roomId,
  userId,
  vote,
}: ISessionRoom) {
  if (!roomId || !userId) {
    return { status: 500, error: "Mandatory" };
  }

  try {
    const res = await fetch("/api/firebase/room-session", {
      method: "PATCH",
      body: JSON.stringify({
        roomId: roomId,
        userId: userId,
        vote: vote,
      }),
    });

    const data = await res.json();

    return {
      status: res.status,
      data,
    };
  } catch (error) {
    return { status: 500, error };
  }
}
