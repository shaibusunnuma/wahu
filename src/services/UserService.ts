import { ProfileDto, UpdateUserDto } from "../dto/user.dto";
import FirebaseService from "./FirebaseService";

const COLLECTION_NAME = "users";

class UserService {
  static async createUserProfile(uid: string, dto: ProfileDto) {
    try {
      const userCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const userDoc = await userCollection
        .doc(uid)
        .set({ uid, ...dto }, { merge: true });
      return userDoc;
    } catch (error) {
      throw new Error(`Failed to create user profile: ${error}`);
    }
  }

  static async getUserProfile(uid: string) {
    try {
      const userCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const user = await userCollection.doc(uid).get();
      return user.data();
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error}`);
    }
  }

  static async updateUserProfile(userId: string, user: UpdateUserDto) {
    try {
      const userCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const userDoc = userCollection.doc(userId);
      await userDoc.update(user);
      const updatedDoc = await userDoc.get();
      return updatedDoc.data();
    } catch (error) {
      throw new Error(`Failed to update user profile: ${error}`);
    }
  }

  static async deleteUserProfile(userId: string) {
    try {
      const userCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      await userCollection.doc(userId).delete();
    } catch (error) {
      throw new Error(`Failed to delete user profile: ${error}`);
    }
  }
}

export default UserService;