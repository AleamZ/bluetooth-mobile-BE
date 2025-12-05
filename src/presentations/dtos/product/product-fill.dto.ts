import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ProductStatus } from "../../../domain/enums/product-status.enum";

export enum ProductSortEnum {
    PRICE_ASC = "PRICE_ASC",
    PRICE_DESC = "PRICE_DESC",
    DATE_ASC = "DATE_ASC",
    DATE_DESC = "DATE_DESC"
}

export enum ProductStatusFilter {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ALL = "ALL"
}

export class ProductFillDTO {
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;

    @IsString()
    @IsOptional()
    searchName?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsEnum(ProductSortEnum)
    @IsOptional()
    sort?: ProductSortEnum;

    @IsEnum(ProductStatusFilter)
    @IsOptional()
    status?: ProductStatusFilter = ProductStatusFilter.ALL;
}
