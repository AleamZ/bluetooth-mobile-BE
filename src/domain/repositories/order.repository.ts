import { IOrder } from "../../infrastructure/model/order.model";
import { StatusOrder } from "../enums/status-order.enum";

export interface IOrderRepository {
  createOrder(order: IOrder): Promise<IOrder>;
  updateStatus(orderId: string, status: StatusOrder): Promise<IOrder | null>;
  isPaid(orderId: string): Promise<boolean>;
  getAllOrders(): Promise<IOrder[]>;
  getOrderById(orderId: string): Promise<IOrder | null>;
}
