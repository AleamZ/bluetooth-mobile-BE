import { Type } from "class-transformer";
import { ArrayMinSize, ValidateNested } from "class-validator";
import { ProductInCartDTO } from "./productInCart.dto";

export class AddToCartDTO {
  @ValidateNested({ each: true })
  @Type(() => ProductInCartDTO)
  @ArrayMinSize(1, { message: "At least one product is required in the cart" })
  products!: ProductInCartDTO[];
}
