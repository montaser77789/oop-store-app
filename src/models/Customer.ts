import { customerPermissions, userRole } from "../types/user";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Product } from "./Product";
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

  getItemCount() {
    return this.cart.getItemCount();
  }
  getCartTotal() {
    return this.cart.getTotalPrice();
  }

  getOrderCount() {
    return 0;
  }

  get hasItemInCart() {
    return !this.cart.isEmpty();
  }

  addProduct(product: Product, quantity: number) {
    this.cart.addItem(product, quantity);
  }
  viewCart() {
    return this.cart.getItems;
  }
  checkOut() {}

  getOrderHistory() {
    return [];
  }
  getRecentOrder(count: number = 5) {}

  RemoveFromCart(productId: number) {
    return this.cart.removeItem(productId);
  }

  clearCart() {
    this.cart.clear();
  }

  /**
   * Returns a copy of all customer orders
   */
  get orderHistory(): Order[] {
    return this.orders;
  }

  /**
   * Get recent orders (last N orders)
   * @param count - Number of recent orders to return
   * @returns Array of recent orders
   */
  get recentOrders(): Order[] {
    return this.orders.slice(-5);
  }
}
