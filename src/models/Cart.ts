import { CartItem } from "./CartItem";
import { Product } from "./Product";

export class Cart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number): boolean {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      const totalQuantity = existingItem.quantity + quantity;
      if (totalQuantity <= product.stock) {
        existingItem.quantity += quantity;
        return true;
      }
    } else {
      if (quantity <= product.stock) {
        this.items.push(new CartItem(product, quantity));
      }
      return true;
    }

    return false;
  }

  removeItem(productId: number) {
    const existingItem = this.items.findIndex(
      (item) => item.product.id === productId
    );
    if (existingItem > -1) {
      this.items.splice(existingItem, 1);
    }
  }
  // get items
  getItems(): CartItem[] {
    return [...this.items];
  }
  // getItems() {
  //   return this.items;
  // }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  reduceStockCheckout(): boolean {
    // Check if all items are available
    for (const item of this.items) {
      if (item.quantity > item.product.stock) {
        return false;
      }
      // If all items are available, reduce stock
      for (const item of this.items) {
        if (!item.product.reduceStock(item.quantity)) {
          return false;
        }
      }
    }
    return true;
  }
}
