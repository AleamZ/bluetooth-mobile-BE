import { IsArray, IsNotEmpty } from "class-validator";
import { OrderItemDTO } from "./order-item.dto";

export class OrderDTO {
  @IsArray()
  @IsNotEmpty({ message: "Orders is array" })
  orders!: OrderItemDTO[];
}
