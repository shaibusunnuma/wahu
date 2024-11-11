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

  public async verifyIdToken(idToken: string) {
    try {
      const decodedToken = await this.getAuth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error(`Failed to verify ID token: ${error}`);
    }
  }
}

export default FirebaseService.getInstance();
