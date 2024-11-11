import FirebaseService from "./FirebaseService";
import { RegisterUserDto } from "../dto/user.dto";
class AuthService {
  static async register(user: RegisterUserDto) {
    try {
      const auth = FirebaseService.getAuth();
      const userRecord = await auth.createUser({
        ...user,
        emailVerified: false,
        disabled: false,
      });
      return userRecord;
    } catch (error) {
      throw new Error(`Failed to register user: ${error}`);
    }
  }

  //Since we are using firebase auth, we will verify the user by the token sent from the client
  static async verifyUserToken(token: string) {
    try {
      const decodedToken = await FirebaseService.verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error(`Failed to verify user token: ${error}`);
    }
  }
}

export default AuthService;
