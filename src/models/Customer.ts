import { customerPermissions, userRole } from "../types/user";
import { User } from "./User";

export class Customer extends User {
  getRole(): userRole {
    return "customer";
  }
  getPermissions(): customerPermissions[] {
    return [];
  }
}
