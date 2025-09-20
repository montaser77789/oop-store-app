import { Admin } from "../models/Admin";
import { Customer } from "../models/Customer";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";

class Store {
  private readonly product: Product[] = [];
  private readonly users: User[] = [];
  private readonly orders: Order[] = [];

  private _storeName: string;
  private _isOpen: boolean = false;

  constructor(storeName: string) {
    this._storeName = storeName;
  }

  // Getters
  get storeName(): string {
    return this._storeName;
  }
  get isOpen(): boolean {
    return this._isOpen;
  }
  get productCount(): number {
    return this.product.length;
  }
  get orderCount(): number {
    return this.orders.length;
  }
  get userCount(): number {
    return this.users.length;
  }

  // Setters with validation
  set storeName(storeName: string) {
    if (!storeName || storeName.trim().length === 0) {
      throw new Error("Store name cannot be empty");
    }

    if (storeName.trim().length < 2) {
      throw new Error("Store name must be at least 2 characters long");
    }

    this._storeName = storeName;
  }

  set isOpen(isOpen: boolean) {
    if (typeof isOpen !== "boolean") {
      throw new Error("Is open must be a boolean");
    }

    this._isOpen = isOpen;
  }

  public registerUser(name: string, email: string, isAdmin: boolean): User {
    if (!this._isOpen) {
      throw new Error("Store is closed");
    }
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    if (!email || !this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    if (this.users.some((user) => user.email === email)) {
      throw new Error("User already exists");
    }
    if (isAdmin) {
      const newAdmin = new Admin(name, email);
      this.users.push(newAdmin);
      return newAdmin;
    } else {
      const newCustomer = new Customer(name, email);
      this.users.push(newCustomer);
      return newCustomer;
    }
  }

  /**
   * Validates an email address
   * @param email - The email address to validate
   * @returns True if the email address is valid, false otherwise
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
