import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { ShoppingCartRepositoryImpl } from "../infrastructure/repositoriesImpl/shopping-cart.repository.impl";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";

const productRepository = new ProductRepositoryImpl();
const variantRepository = new VariantRepositoryImpl();
const shoppingCartRepository = new ShoppingCartRepositoryImpl();
function caculateTotalPrice(product: any, variant: any, quantity: number) {
  return (variant.price + product.basePrice) * quantity;
}
function checkExistedProduct(productId: string) {
  const existedProduct = productRepository.findProductById(productId);
  if (!existedProduct) {
    throw new NotFoundException("Product not found");
  }
  return existedProduct;
}
function checkExistedVariant(variantId: string) {
  const existedVariant = variantRepository.findVariantById(variantId);
  if (!existedVariant) {
    throw new NotFoundException("Variant not found");
  }
  return existedVariant;
}
export const addToCartService = async (userId: string, products: any[]) => {
  await Promise.all(
    products.map(async (product: any) => {
      const existedProduct = await checkExistedProduct(product.productId);
      const existedVariant = await checkExistedVariant(product.variantId);
      const totalPrice = caculateTotalPrice(
        existedProduct,
        existedVariant,
        product.quantity
      );
      const productAddCart = {
        productId: product.productId,
        variantId: product.variantId,
        quantity: product.quantity,
        totalPrice: totalPrice,
      };
      await shoppingCartRepository.addToCart(userId, productAddCart);
    })
  );
};

export const removeFromCartService = async (
  userId: string,
  products: string
) => {
  const arrProducts = products.split(",").map((product) => product.trim());
  await Promise.all(
    arrProducts.map(async (productId: string) => {
      await shoppingCartRepository.removeFromCart(userId, productId);
    })
  );
};
