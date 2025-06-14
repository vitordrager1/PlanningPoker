import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { nameRoom, voteOptionId, userId } = await req.json();
    const docRef = await db.collection("rooms").add({
      name: nameRoom,
      voteOption: voteOptionId,
      createdBy: userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ roomId: docRef.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to call /rooms route" },
      { status: 500 },
    );
  }
}
