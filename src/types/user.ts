export type userRole = "Admin" | "customer";
export type customerPermissions =
  | "create_order"
  | "update_order"
  | "delete_order"
  | "view_order";
export type adminPermissions =
  | "create_product"
  | "update_product"
  | "delete_product"
  | "view_product"
  | "create_order"
  | "update_order"
  | "delete_order"
  | "view_order";
