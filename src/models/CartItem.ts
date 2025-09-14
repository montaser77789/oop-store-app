import { Product } from "./Product";

export class CartItem {
  constructor(public readonly product: Product, public quantity_: number) {}
  // Getters
  get quantity(): number {
    return this.quantity;
  }
  // Setters
  set quantity(newQuantity: number) {
    if (newQuantity > 0) {
      this.quantity_ = newQuantity;
    } else {
      throw new Error("Quantity must be greater than 0");
    }
  }

  // Other methods
  getTotalPrice(): number {
    return this.product.price * this.quantity_;
  }
}
