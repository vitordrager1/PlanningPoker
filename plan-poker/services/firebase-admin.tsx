import admin from "firebase-admin";

const serviceAccount = require("@/poker-plan-br-firebase-adminsdk-fbsvc-026f3e86ab.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
