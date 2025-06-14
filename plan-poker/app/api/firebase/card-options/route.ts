import { NextResponse } from "next/server";
import { db } from "@/services/firebase-admin";

export async function GET() {
  const snapshot = await db.collection("cards").get();
  const options = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(options);
}
