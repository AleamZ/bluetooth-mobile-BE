import { IShoppingCart } from "../../infrastructure/model/shoppingCart.model";

export interface IShoppingCartRepository {
  addToCart(userId: string, products: any): Promise<void>;
  removeFromCart(userId: string, productId: string): Promise<void>;
  getCart(userId: string): Promise<IShoppingCart | null>;
  getAllCarts(): Promise<IShoppingCart[]>;
}
