import { OrderStatus } from "../types/order";
import { CartItem } from "./CartItem";
import { Customer } from "./Customer";

export class Order {
  private readonly _orderId: number;
  private readonly _customer: Customer;
  private _items: CartItem[];
  private _total: number;
  private _createdAt: Date = new Date();
  private _updatedAt: Date = new Date();
  private static _allOrders: Order[] = [];
  private _status: OrderStatus = "Pending";

  private static nextOrderId: number = 1;

  constructor(customer: Customer, items: CartItem[] = []) {
    if (!customer) {
      throw new Error("Customer is required");
    }
    if (!items || items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    this._orderId = Order.nextOrderId++;
    this._customer = customer;
    this._items = items;
    this._total = this.calculateTotal();
  }

  // Methods
  calculateTotal(): number {
    return this._items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  // Getters
  get orderId(): number {
    return this._orderId;
  }

  get orderSummary(): string {
    return `Order ID: ${this._orderId}\nCustomer: ${
      this._customer.name
    }\nItems: ${this._items
      .map((item) => `${item.product.name} - ${item.quantity}`)
      .join(", ")}\nTotal: ${this._total}\nStatus: ${
      this._status
    }\nCreated At: ${this._createdAt.toLocaleString()}\nUpdated At: ${this._updatedAt.toLocaleString()}`;
  }

  get customer(): Customer {
    return this._customer;
  }

  get items(): CartItem[] {
    return this._items;
  }

  get total(): number {
    return this._total;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  } // Setters
  set status(status: OrderStatus) {
    this._status = status;
    this._updatedAt = new Date();
  }

  get recentOrders(): Order[] {
    return this._customer.recentOrders;
  }

  /**
   * Get total revenue for all orders
   * @returns Total revenue
   */
  static getTotalRevenue(): number {
    // Get all orders
    return Order._allOrders.reduce((total, order) => total + order.total, 0);
  }

  /**
   * Get total revenue for the customer
   * @returns Total revenue
   */
  get customerTotalRevenue(): number {
    return this._customer.orderHistory.reduce(
      (total, order) => total + order.total,
      0
    );
  }
}
