import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase-admin";

// POST: Adiciona um usuário na roomSession se ainda não existir
export async function POST(req: NextRequest) {
  try {
    const { roomId, userId, username } = await req.json();

    if (!roomId || !userId || !username) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const docId = `${roomId}_${userId}`;
    const docRef = db.collection("roomSession").doc(docId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      // Usuário já está na sessão, não faz nada
      return NextResponse.json(
        { message: "User already in session" },
        { status: 200 },
      );
    }

    // Se não existe, adiciona
    await docRef.set({
      roomId,
      userId,
      name: username,
      createdAt: new Date(),
    });

    return NextResponse.json({ sessionRoomId: docId }, { status: 200 });
  } catch (error) {
    console.error("Error in room-session POST:", error);
    return NextResponse.json(
      { error: "Failed to update room session" },
      { status: 500 },
    );
  }
}

// PATCH: Atualiza apenas o voto do usuário
export async function PATCH(req: NextRequest) {
  try {
    const { roomId, userId, vote } = await req.json();

    if (!roomId || !userId || vote === undefined) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const docId = `${roomId}_${userId}`;

    await db.collection("roomSession").doc(docId).set(
      {
        vote,
        updatedAt: new Date(),
      },
      { merge: true }, // Apenas atualiza o campo `vote`
    );

    return NextResponse.json({ sessionRoomId: docId }, { status: 200 });
  } catch (error) {
    console.error("Error in room-session PATCH:", error);
    return NextResponse.json(
      { error: "Failed to update vote" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const roomId = req.nextUrl.searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { error: "Missing roomId parameter." },
        { status: 400 },
      );
    }

    const querySnapshot = await db
      .collection("roomSession")
      .where("roomId", "==", roomId)
      .get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: "No sessions found for this roomId." },
        { status: 404 },
      );
    }

    const sessions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching room sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch room sessions." },
      { status: 500 },
    );
  }
}
