import { Auth } from "aws-amplify";
import { User } from "@/models/user/User";
import { CustomAlert } from "@/models/user/CustomAlert";

export default {
  async signOut(): Promise<CustomAlert> {
    try {
      await Auth.signOut({ global: true });
      return new CustomAlert(200, "Logged out successfully");
    } catch (err) {
      return new CustomAlert(400, "Error logging out from auth server", err);
    }
  },

  async getCurrentAuthenticatedUser(): Promise<CustomAlert> {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const authenticatedUser = new User(
        cognitoUser.username,
        cognitoUser.attributes["custom:forename"],
        cognitoUser.attributes["custom:surname"],
        cognitoUser.attributes.email,
        "",
        cognitoUser.attributes["custom:avatar"]
      );
      authenticatedUser.setId(cognitoUser.attributes.sub);
      return new CustomAlert(200, "User authenticated successfully", undefined, authenticatedUser);
    } catch (err) {
      return new CustomAlert(403, "Error authenticating current user", err);
    }
  }
};
