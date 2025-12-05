import { io } from "../config/socket-io";
import { StatusOrder } from "../domain/enums/status-order.enum";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { IOrder } from "../infrastructure/model/order.model";
import { OrderRepositoryImpl } from "../infrastructure/repositoriesImpl/order.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";
import { OrderItemDTO } from "../presentations/dtos/order/order-item.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
import { v4 as uuidv4 } from "uuid";
const orderRepository = new OrderRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const variantRepository = new VariantRepositoryImpl();
export const createOrderService = async (userId: string, orders: IOrder[]) => {
  await Promise.all(
    orders.map(async (ord) => {
      try {
        const createOrderDTO = await createAndValidateDto(OrderItemDTO, ord);

        const findProduct = await productRepository.findProductById(
          createOrderDTO.productId
        );

        let findVariantOfProduct = null;
        if (createOrderDTO.variantId) {
          findVariantOfProduct = await variantRepository.findVariantById(
            createOrderDTO.variantId
          );
          if (!findVariantOfProduct) {
            throw new NotFoundException(
              `Biến thể với ID ${createOrderDTO.variantId} không tồn tại.`
            );
          }
        }

        let totalPrice = 0;
        if (findProduct) {
          // totalPrice = findProduct.basePrice * createOrderDTO.quantity;
          if (findVariantOfProduct) {
            totalPrice += findVariantOfProduct.price * createOrderDTO.quantity;
          }
        } else {
          throw new Error(
            `Sản phẩm với ID ${createOrderDTO.productId} không tồn tại.`
          );
        }

        createOrderDTO.numberCode = `ORD-${uuidv4()}`;

        const newOrder = {
          ...createOrderDTO,
          userId: userId,
          totalPrice: totalPrice,
        };
        await orderRepository.createOrder(newOrder);
        io.emit("new-order", newOrder);
        return newOrder;
      } catch (error: any) {
        throw new BadRequestException(
          `Lỗi khi xử lý đơn hàng, ${error.message}`
        );
      }
    })
  );
};

async function updateStatusOrderService(orderId: string, status: StatusOrder) {
  const order = await orderRepository.updateStatus(orderId, status);
  return order;
}

export const approveOrderService = async (orderId: string) => {
  return await updateStatusOrderService(orderId, StatusOrder.APPROVED);
};

export const cancelOrderService = async (orderId: string) => {
  return await updateStatusOrderService(orderId, StatusOrder.CANCELED);
};

export const deliveredOrderService = async (orderId: string) => {
  return await updateStatusOrderService(orderId, StatusOrder.DELIVERED);
};

export const deliveredFailOrderService = async (orderId: string) => {
  return await updateStatusOrderService(orderId, StatusOrder.DELIVERY_FAILED);
};

export const refundedOrderService = async (orderId: string) => {
  return await updateStatusOrderService(orderId, StatusOrder.REFUNDED);
};

export const doneOrderService = async (orderId: string) => {
  const order = await orderRepository.getOrderById(orderId);
  if (!order) {
    throw new BadRequestException(`Đơn hàng không tồn tại.`);
  }
  const product = await productRepository.findProductById(
    order.productId.toString()
  );
  if (!product) {
    throw new BadRequestException(`Sản phẩm không tồn tại.`);
  }
  // product.countSold = (product.countSold || 0) + order.quantity;
  await product.save();

  await Promise.all([
    updateStatusOrderService(orderId, StatusOrder.DONE),
    orderRepository.isPaid(orderId),
  ]);
};
