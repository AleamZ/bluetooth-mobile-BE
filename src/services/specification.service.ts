import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { SpecificationRepositoryImpl } from "../infrastructure/repositoriesImpl/specification.repository.impl";
const specificationRepo = new SpecificationRepositoryImpl();
const categoryRepo = new CategoryRepositoryImpl();
const productRepo = new ProductRepositoryImpl();
export const SpecificationService = {
  createSpecification: async (categoryId: string, type: any) => {
    try {
      console.log("Service creating specifications for categoryId:", categoryId);
      const specificationsToInsert = type.map((group: any) => ({
        categoryId,
        groupName: group.groupName,
        isDeleted: false,
        specifications: group.specifications.map((spec: any) => ({
          name: spec.name,
          checkedFilter: spec.checkedFilter || false,
          isDeleted: false,
        })),
      }));

      const createdSpecifications = await specificationRepo.createSpecifications(
        specificationsToInsert
      );

      console.log("Created specifications result:", createdSpecifications);
      return createdSpecifications;
    } catch (error) {
      console.error("Error in createSpecification service:", error);
      throw error;
    }
  },

  getSpecificationByCategoryId: async (categoryId: string) => {
    try {
      console.log("Service getting specifications for categoryId:", categoryId);
      const data = await specificationRepo.getSpecificationByCategoryId(categoryId);
      if (!data || data.length === 0) {
        console.log("No specifications found for categoryId:", categoryId);
      } else {
        console.log(`Found ${data.length} specifications`);
      }
      return data;
    } catch (error) {
      console.error("Error in getSpecificationByCategoryId service:", error);
      throw error;
    }
  },

  getSpecificationFilterByCategoryUrl: async (url: string) => {
    try {
      console.log(`Getting filter specifications for category URL: ${url}`);
      const findCategory = await categoryRepo.getCategoryByUrl(url);
      if (!findCategory) {
        console.log(`Category not found with URL: ${url}`);
        throw new NotFoundException("Not found category");
      }

      console.log(`Found category: ${findCategory._id}`);

      // Lấy danh sách specifications của category
      const specificationsOfCategory = await specificationRepo.getSpecificationByCategoryId(
        findCategory._id as string
      );

      console.log(`Found ${specificationsOfCategory?.length || 0} specifications`);

      if (!specificationsOfCategory || specificationsOfCategory.length === 0) {
        console.log("No specifications found for this category");
        return [];
      }

      // Print the actual specifications for debugging
      console.log("Specifications structure:", JSON.stringify(specificationsOfCategory));

      // Lấy danh sách sản phẩm theo category
      const productCategories = await productRepo.findProductByCategory(
        findCategory._id as string
      );

      console.log(`Found ${productCategories?.length || 0} products for this category`);

      if (!productCategories || productCategories.length === 0) {
        console.log("No products found for this category");

        // Even if no products, we can still return filter specifications that are marked as checkedFilter
        const filterSpecs = [];
        for (const category of specificationsOfCategory) {
          for (const spec of category.specifications || []) {
            if (spec.checkedFilter && !spec.isDeleted) {
              filterSpecs.push({
                nameFilter: spec.name,
                values: [] // No values since no products
              });
            }
          }
        }
        return filterSpecs;
      }

      // Map lưu trữ specifications theo key và values (dạng Set để tránh trùng lặp)
      const specMap: Record<string, Set<string>> = {};

      // Log the structure of a product to debug
      if (productCategories.length > 0) {
        console.log("First product structure:", JSON.stringify(productCategories[0]));
      }

      productCategories.forEach((product, index) => {
        console.log(`Processing product ${index + 1}/${productCategories.length}`);

        if (!product.specifications || !Array.isArray(product.specifications)) {
          console.log(`Product ${index + 1} has no specifications array`);
          return; // Skip this product
        }

        product.specifications.forEach((spec: any, specIndex: number) => {
          console.log(`Processing product ${index + 1}, spec ${specIndex + 1}`);

          if (!spec.specificationsSub || !Array.isArray(spec.specificationsSub)) {
            console.log(`Product ${index + 1}, spec ${specIndex + 1} has no specificationsSub array`);
            return; // Skip this spec
          }

          spec.specificationsSub.forEach((subSpec: any, subIndex: number) => {
            if (!subSpec.key || !subSpec.value) {
              console.log(`Missing key/value for product ${index + 1}, spec ${specIndex + 1}, subSpec ${subIndex + 1}`);
              return;
            }

            const key = subSpec.key.trim();
            const value = subSpec.value.trim();

            if (!specMap[key]) {
              specMap[key] = new Set();
            }
            specMap[key].add(value);
          });
        });
      });

      console.log("Generated specMap keys:", Object.keys(specMap));

      // Tạo danh sách các tên specifications có checkedFilter: true
      const checkedNames = new Set<string>();
      specificationsOfCategory.forEach((category: any) => {
        if (!category.specifications || !Array.isArray(category.specifications)) {
          return;
        }

        category.specifications.forEach((spec: any) => {
          if (spec.checkedFilter && !spec.isDeleted) {
            checkedNames.add(spec.name.trim());
          }
        });
      });

      console.log("Checked filter names:", [...checkedNames]);

      // Lọc specMap để chỉ giữ lại các specifications có checkedFilter: true
      const filterResults = Object.entries(specMap)
        .filter(([key]) => checkedNames.has(key.trim()))
        .map(([key, values]) => ({
          nameFilter: key,
          values: [...values],
        }));

      console.log(`Returning ${filterResults.length} filter specifications`);

      // If no filter results but we have specifications, return empty filters
      if (filterResults.length === 0 && checkedNames.size > 0) {
        return [...checkedNames].map(name => ({
          nameFilter: name,
          values: []
        }));
      }

      return filterResults;
    } catch (error) {
      console.error("Error in getSpecificationFilterByCategoryUrl:", error);
      throw error;
    }
  },
  updateSpecification: async (id: string, data: any) => {
    return await specificationRepo.updateSpecification(id, data);
  },

  // Rename existing delete method to soft delete
  softDeleteSpecificationById: async (id: string) => {
    const specification = await specificationRepo.getSpecificationById(id);
    if (!specification) {
      throw new NotFoundException("Specification not found");
    }
    return await specificationRepo.softDeleteSpecification(id);
  },

  // Add a new method for hard delete
  hardDeleteSpecificationById: async (id: string) => {
    const specification = await specificationRepo.getSpecificationById(id);
    if (!specification) {
      throw new NotFoundException("Specification not found");
    }
    return await specificationRepo.hardDeleteSpecification(id);
  },
};
