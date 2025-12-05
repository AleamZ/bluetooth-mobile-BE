import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  deleteSoftProductService,
  filterProductService,
  getFilterProductService,
  getProductByIdService,
  getProductsActiveService,
  getProductSpecialService,
  getProductsService,
  getProductWithFillService,
  updateProductService,
  searchActiveProductsService,
} from "../../services/product.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const createProductController = async (req: Request, res: Response) => {
  const newProduct = await createProductService(req.body);
  res.json(
    successResponse(
      HttpStatus.CREATED,
      "Create Product Successfully",
      newProduct
    )
  );
};

export const getProductsController = async (req: Request, res: Response) => {
  const products = await getProductsService();
  res.json(
    successResponse(HttpStatus.OK, "Get Products Successfully", products)
  );
};

export const getProductByIdController = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await getProductByIdService(productId);
  res.json(successResponse(HttpStatus.OK, "Get Product Successfully", product));
};
export const getProductsActiveController = async (
  req: Request,
  res: Response
) => {
  const products = await getProductsActiveService();
  res.json(
    successResponse(HttpStatus.OK, "Get Products Successfully", products)
  );
};

export const updateProductController = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const product = await updateProductService(productId, req.body);
  res.json(
    successResponse(
      HttpStatus.OK,
      "Update Product And Specifications Successfully",
      product
    )
  );
};

export const deleteSoftProductController = async (
  req: Request,
  res: Response
) => {
  const ids = req.query.ids as string;
  await deleteSoftProductService(ids);
  res.json(successResponse(HttpStatus.OK, "Delete Soft Product Successfully"));
};

export const deleteProductController = async (req: Request, res: Response) => {
  const ids = req.query.ids as string;
  await deleteProductService(ids);
  res.json(successResponse(HttpStatus.OK, "Delete Product Successfully"));
};

export const getFilteredProductsController = async (
  req: Request,
  res: Response
) => {
  const productsFilter = await getFilterProductService(req.body);
  return res.json(
    successResponse(
      HttpStatus.OK,
      "Get Filtered Products Successfully",
      productsFilter
    )
  );
};

export const getProductSpecial = async (req: Request, res: Response) => {
  const productSpecial = await getProductSpecialService();
  return res.json(
    successResponse(
      HttpStatus.OK,
      "Get Product Special Successfully",
      productSpecial
    )
  );
};

export const filterProductController = async (req: Request, res: Response) => {
  const { categoryUrl, values } = req.body;
  const data = await filterProductService(categoryUrl, values);
  return res.json(
    successResponse(HttpStatus.OK, "Get Product  Successfully", data)
  );
};

export const getProductWithFillController = async (req: Request, res: Response) => {
  const { products, pagination } = await getProductWithFillService(req.body);
  res.json({
    statusCode: HttpStatus.OK,
    message: "Get Products Successfully",
    data: products,
    pagination,
    ok: true
  });
};

export const searchActiveProductsController = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  const products = await searchActiveProductsService(searchTerm as string);
  res.json(
    successResponse(HttpStatus.OK, "Search Products Successfully", products)
  );
};

