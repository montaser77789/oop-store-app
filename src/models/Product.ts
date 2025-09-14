import { Catagory } from "../types/catagory";

export class Product {
  public readonly id: number;

  private static nextId: number = 1;

  constructor(
    private _name: string,
    private _price: number,
    private _stock: number,
    private _catagory: Catagory
  ) {
    this.id = Product.nextId++;
  }

  get name() {
    return this._name;
  }
  get catagory() {
    return this._catagory;
  }
  get price() {
    return this._price;
  }
  get stock() {
    return this._stock;
  }
  set name(newName: string) {
    if (newName.length > 0) {
      this._name = newName;
    } else {
      throw new Error("Name must be greater than 0");
    }
  }

  set price(newPrice: number) {
    if (newPrice > 0) {
      this._price = newPrice;
    } else {
      throw new Error("Price must be greater than 0");
    }
  }

  reduceStock(quantity: number): boolean {
    if (quantity > 0) {
      this._stock -= quantity;
      return true;
    } else {
      return false;
    }
  }
}
