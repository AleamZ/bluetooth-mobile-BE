import { StatusOrder } from "../domain/enums/status-order.enum";
import { OrderRepositoryImpl } from "../infrastructure/repositoriesImpl/order.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { ShoppingCartRepositoryImpl } from "../infrastructure/repositoriesImpl/shopping-cart.repository.impl";
import { IOrderAnalytics } from "../types/statistical-order.interface";

const orderRepository = new OrderRepositoryImpl();
const cartRepository = new ShoppingCartRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
export const getOrdersShop = async (): Promise<IOrderAnalytics> => {
  const orders = await orderRepository.getAllOrders();
  const totalCart = await cartRepository.getAllCarts();
  const ordersPending = orders.filter(
    (order) => order.status === StatusOrder.PENDING
  );
  const ordersApproved = orders.filter(
    (order) => order.status === StatusOrder.APPROVED
  );
  const ordersDelivered = orders.filter(
    (order) => order.status === StatusOrder.DELIVERED
  );
  const ordersCanceled = orders.filter(
    (order) => order.status === StatusOrder.CANCELED
  );
  const resultAnaltyics: IOrderAnalytics = {
    totalOrders: orders.length,
    totalCart: totalCart.length,
    totalPending: ordersPending.length,
    totalApproved: ordersApproved.length,
    totalDelivered: ordersDelivered.length,
    totalCanceled: ordersCanceled.length,
  };
  return resultAnaltyics;
};

export const getTopSellingProducts = async () => {
  const products = await productRepository.getProducts();
  // const topSellingProducts = products.sort((a, b) => b.countSold - a.countSold);
  // const result = topSellingProducts.slice(0, 5);
  return products;
};
