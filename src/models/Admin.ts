import { adminPermissions, userRole } from "../types/user";
import { User } from "./User";

export class Admin extends User {
  constructor(name: string, email: string) {
    super(name, email);
  }

  getRole(): userRole {
    return "Admin";
  }

  getPermissions(): adminPermissions[] {
    return [
      "create_product",
      "update_product",
      "delete_product",
      "view_product",
      "update_order",
      "delete_order",
      "view_order",
      "create_order",
    ];
  }
}
