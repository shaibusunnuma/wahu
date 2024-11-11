import * as admin from "firebase-admin";
import serviceAccountKey from "../../serviceAccountKey.json";

export class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccountKey as admin.ServiceAccount
        ),
        // credential: admin.credential.applicationDefault(), // or use admin.credential.cert(serviceAccountKey) for custom cert
        // databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public getFirestore() {
    return admin.firestore();
  }

  public getAuth() {
    return admin.auth();
  }
}

export default FirebaseService.getInstance();
