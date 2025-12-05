import { HttpStatus } from "../../domain/enums/http-status.enum";
import { HttpException } from "../../domain/exceptions/http.exception";
import { IShoppingCartRepository } from "../../domain/repositories/shopping-cart.repository";
import { IShoppingCart, ShoppingCart } from "../model/shoppingCart.model";

export class ShoppingCartRepositoryImpl implements IShoppingCartRepository {
  async getAllCarts(): Promise<IShoppingCart[]> {
    return await ShoppingCart.find();
  }
  async getCart(userId: string): Promise<IShoppingCart | null> {
    return await ShoppingCart.findOne({ userId: userId });
  }
  async removeFromCart(userId: string, productId: string): Promise<void> {
    try {
      const cart = await this.getCart(userId);
      if (!cart) {
        throw new HttpException(HttpStatus.NOT_FOUND, "Cart not found");
      }
      const productToRemove = cart.products.find(
        (product) => product.productId === productId
      );
      if (productToRemove) {
        cart.products.splice(cart.products.indexOf(productToRemove), 1);
      }
      await cart.save();
    } catch (error: any) {
      throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
  async addToCart(userId: string, product: any): Promise<void> {
    try {
      let cart = await this.getCart(userId);
      if (!cart) {
        cart = new ShoppingCart({ userId: userId, products: [] });
      }

      const existedProduct = cart.products.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.variantId === product.variantId
      );

      if (existedProduct >= 0) {
        cart.products[existedProduct].quantity += product.quantity;
        cart.products[existedProduct].totalPrice += product.totalPrice;
      } else {
        cart.products.push({
          productId: product.productId,
          variantId: product.variantId,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
        });
      }
      await cart.save();
    } catch (error: any) {
      throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
}
