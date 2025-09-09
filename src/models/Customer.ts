import { customerPermissions, userRole } from "../types/user";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { User } from "./User";

export class Customer extends User {
  private readonly cart: Cart;
  private readonly orders: Order[] = [];

  
  constructor(name: string, email: string) {
    super(name, email);
    this.cart = new Cart();
  }
  getRole(): userRole {
    return "customer";
  }
  getPermissions(): customerPermissions[] {
    return [];
  }
}
