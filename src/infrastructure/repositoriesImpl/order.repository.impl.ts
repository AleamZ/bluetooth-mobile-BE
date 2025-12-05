import { StatusOrder } from "../../domain/enums/status-order.enum";
import { IOrderRepository } from "../../domain/repositories/order.repository";
import Order, { IOrder } from "../model/order.model";

export class OrderRepositoryImpl implements IOrderRepository {
  async getOrderById(orderId: string): Promise<IOrder | null> {
    return await Order.findById(orderId);
  }
  async isPaid(orderId: string): Promise<boolean> {
    const order = await Order.findById(orderId);
    if (order) {
      order.isPaid = true;
      await order.save();
      return true;
    }
    return false;
  }
  async getAllOrders(): Promise<IOrder[]> {
    return await Order.find();
  }
  async updateStatus(
    orderId: string,
    status: StatusOrder
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(orderId, { status });
  }
  async createOrder(order: IOrder): Promise<IOrder> {
    return await Order.create(order);
  }
}
