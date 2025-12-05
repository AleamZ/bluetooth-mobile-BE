import mongoose from "mongoose";
import { ProductStatus } from "../domain/enums/product-status.enum";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { IProduct } from "../infrastructure/model/product.model";
import { IProductSpecification } from "../infrastructure/model/productSpecification.model";
import { IProductVariant } from "../infrastructure/model/productVariant.model";
import { BrandRepositoryImpl } from "../infrastructure/repositoriesImpl/brand.repository.impl";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";
import { CreateProductDTO } from "../presentations/dtos/product/create-product.dto";
import { FilterProductDto } from "../presentations/dtos/product/filter-product.dto";
import { ProductFillDTO, ProductSortEnum, ProductStatusFilter } from "../presentations/dtos/product/product-fill.dto";
import { UpdateProductDTO } from "../presentations/dtos/product/update-product.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const productRepository = new ProductRepositoryImpl();
const variantRepository = new VariantRepositoryImpl();
const brandRepository = new BrandRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();

async function getVariants(productId: string): Promise<IProductVariant[]> {
  const variants = await variantRepository.getVariantByProductId(productId);
  const plainVariants = variants.map((variant) => {
    const variantObject = variant.toObject();
    delete variantObject._id;
    delete variantObject.productId;
    delete variantObject.updatedAt;
    delete variantObject.createdAt;
    return variantObject;
  });
  return plainVariants;
}

export const createProductService = async (product: Partial<IProduct>) => {
  const createProductDto = await createAndValidateDto(
    CreateProductDTO,
    product
  );
  return await productRepository.createProduct(createProductDto);
};

export const getProductsService = async () => {
  const products = await productRepository.getProducts();

  return products;
};

export const getProductByIdService = async (productId: string) => {
  const product = await productRepository.findProductById(productId);
  const brand = await brandRepository.getBrandById(String(product?.brandId));
  const category = await categoryRepository.getCategoryById(
    String(product?.categoryId)
  );
  const result = {
    product,
    brand,
    category,
  };
  return result;
};
export const getProductsActiveService = async () => {
  const products = await productRepository.getProductsActive();

  return products;
};
export const updateProductService = async (
  productId: string,
  formData: Partial<IProduct>
) => {
  const updateProductDTO = await createAndValidateDto(
    UpdateProductDTO,
    formData
  );
  if (!productId) {
    throw new BadRequestException("Product Id is required");
  }

  // Validate specifications format if provided
  if (updateProductDTO.specifications) {
    updateProductDTO.specifications.forEach((spec: { nameGroup: any; specificationsSub: any; }) => {
      if (!spec.nameGroup || !Array.isArray(spec.specificationsSub)) {
        throw new BadRequestException("Invalid specification format");
      }
    });
  }

  const product = await productRepository.updateProduct(
    productId,
    updateProductDTO
  );
  return product;
};

export const deleteSoftProductService = async (ids: string) => {
  const idArray = ids.split(",").map((id) => id.trim());
  await Promise.all(
    idArray.map(async (id) => {
      const product = await productRepository.findProductById(id);
      if (product?.isDeleted) {
        await productRepository.updateProduct(id, { isDeleted: false });
      } else {
        await productRepository.updateProduct(id, { isDeleted: true });
      }
    })
  );
};

export const deleteProductService = async (ids: string) => {
  const idArray = ids.split(",").map((id) => id.trim());
  await Promise.all(
    idArray.map(async (id) => {
      await productRepository.deleteProduct(id);
    })
  );
};

export const getFilterProductService = async (formFilter: any) => {
  const formFilterData = await createAndValidateDto(
    FilterProductDto,
    formFilter
  );

  // Nếu có URL nhưng không có categoryId, lấy categoryId từ URL
  if (formFilterData?.url && !formFilterData?.categoryId) {
    const category = await categoryRepository.getCategoryByUrl(
      formFilterData.url
    );
    if (category) {
      formFilterData.categoryId = category.id;
    }
  }

  // Nếu không có brandName và categoryId thì trả về tất cả sản phẩm
  if (!formFilterData?.brandName && !formFilterData?.categoryId) {
    return await productRepository.getProducts();
  }

  // Nếu có brandName nhưng không có categoryId
  if (formFilterData?.brandName) {
    const brand = await brandRepository.getBrandByName(formFilterData.brandName);
    if (!brand) {
      throw new NotFoundException("Brand not found");
    }
    if (!formFilterData?.categoryId) {
      return await productRepository.findProductByBrand(brand._id);
    }
    // Nếu có cả brandName và categoryId
    return await productRepository.findProductByBrandAndCategory(
      brand._id,
      formFilterData.categoryId
    );
  }

  // Nếu có categoryId nhưng không có brandName
  return await productRepository.findProductByCategory(
    formFilterData.categoryId
  );
};

export const getProductSpecialService = async () => {
  const getBrands = await brandRepository.getBrandsActive();
  const getProducts = await productRepository.getProductsActive();
  const getCategories = await categoryRepository.getCategoriesActive();
  const result = getCategories
    .sort((a, b) => a.order - b.order)
    .map((category) => {
      return {
        categoryId: category.id,
        categoryName: category.name,
        brands: getBrands
          .filter((brand) => brand.categoryIds.includes(category.id))
          .map((item) => {
            return {
              _id: item._id,
              name: item.name,
            };
          }),
        products: getProducts
          .filter(
            (product) => String(product.categoryId) === String(category._id)
          )
          .map((item) => {
            return {
              _id: item._id,
              name: item.name,
              salePrice: item.variants?.length
                ? item.variants?.[0].salePrice
                : item.salePrice,
              price: item.variants?.length
                ? item.variants?.[0].price
                : item.price,
              imageThumbnailUrl: item.imageThumbnailUrl,
            };
          }),
      };
    });
  return result;
};

export const filterProductService = async (
  categoryUrl: string,
  values: string[]
) => {
  const findCategory = await categoryRepository.getCategoryByUrl(categoryUrl);
  if (!findCategory) {
    throw new NotFoundException("category not found");
  }
  if (values.length === 0) {
    return await productRepository.findProductByCategory(
      findCategory._id as string
    );
  }
  return await productRepository.filterProduct(
    findCategory._id as string,
    values
  );
};

export const getProductWithFillService = async (fillDto: ProductFillDTO) => {
  const query: any = {};
  const { page = 1, limit = 10 } = fillDto;
  const skip = (page - 1) * limit;

  // Apply status filter
  if (fillDto.status === ProductStatusFilter.ACTIVE) {
    query.isDeleted = false;
  } else if (fillDto.status === ProductStatusFilter.INACTIVE) {
    query.isDeleted = true;
  }

  // Apply search by name
  if (fillDto.searchName) {
    query.name = { $regex: new RegExp(fillDto.searchName, 'i') };
  }

  // Apply category filter
  if (fillDto.categoryId) {
    query.categoryId = new mongoose.Types.ObjectId(fillDto.categoryId);
  }

  // Determine sort options
  const sortOptions: any = {};
  if (fillDto.sort) {
    switch (fillDto.sort) {
      case ProductSortEnum.PRICE_ASC:
        sortOptions.price = 1;
        break;
      case ProductSortEnum.PRICE_DESC:
        sortOptions.price = -1;
        break;
      case ProductSortEnum.DATE_ASC:
        sortOptions.createdAt = 1;
        break;
      case ProductSortEnum.DATE_DESC:
        sortOptions.createdAt = -1;
        break;
    }
  }

  try {
    const [products, total] = await Promise.all([
      productRepository.findProducts(query, {
        skip,
        limit,
        sort: sortOptions
      }),
      productRepository.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      products: products.map(product => ({
        ...product.toObject(),
        id: product._id
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        limit
      }
    };

  } catch (error) {
    throw new BadRequestException('Error fetching products');
  }
};

export const searchActiveProductsService = async (searchTerm?: string) => {
  const query: any = { isDeleted: false };

  if (searchTerm) {
    query.name = { $regex: new RegExp(searchTerm, 'i') };
  }

  const products = await productRepository.findProducts(query, {
    skip: 0,
    limit: 5, // Giới hạn chỉ lấy 5 sản phẩm
    sort: { createdAt: -1 }
  });

  return products.map(product => {
    let displayPrice = product.price;
    let displaySalePrice = product.salePrice;

    if (product.variants && product.variants.length > 0) {
      const lowestPriceVariant = product.variants.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      );
      displayPrice = lowestPriceVariant.price;
      displaySalePrice = lowestPriceVariant.salePrice;
    }

    return {
      id: product._id,
      name: product.name,
      imageThumbnailUrl: product.imageThumbnailUrl,
      price: displayPrice,
      salePrice: displaySalePrice
    };
  });
};
