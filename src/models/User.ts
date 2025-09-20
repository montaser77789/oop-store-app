import { adminPermissions, customerPermissions, userRole } from "../types/user";

export abstract class User {
  private static _nextUserId: number = 1;
  private readonly id: string;

  constructor(protected _name: string, protected _email: string) {
    this.id = User._nextUserId.toString();
  }
  // Getters
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }

  // Setters
  set name(newName: string) {
    // Validation
    if (!newName || newName.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    if (newName.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long!");
    }
    this._name = newName.trim();
  }
  
  set email(newEmail: string) {
    if (!newEmail || newEmail.trim().length === 0) {
      throw new Error("Email cannot be empty");
    }
    this._email = newEmail.trim();
  }

  abstract getRole(): userRole;
  abstract getPermissions(): customerPermissions[] | adminPermissions[];
}
