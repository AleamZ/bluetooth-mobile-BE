import mongoose from "mongoose";
// Import the correct model - adjust this import if needed
import SpecificationModel from "../../domain/models/specification.model";

export class SpecificationRepositoryImpl {
  /**
   * Creates multiple specifications
   */
  async createSpecifications(specifications: any[]) {
    try {
      console.log("Creating specifications:", JSON.stringify(specifications));
      // Ensure we're using the correct model name
      return await SpecificationModel.create(specifications);
    } catch (error) {
      console.error("Error creating specifications:", error);
      throw new Error(`Error creating specifications: ${error}`);
    }
  }

  /**
   * Get specifications by category ID
   */
  async getSpecificationByCategoryId(categoryId: string) {
    try {
      console.log("Getting specifications for categoryId:", categoryId);
      // Convert string to ObjectId if needed
      const id = mongoose.Types.ObjectId.isValid(categoryId) ?
        new mongoose.Types.ObjectId(categoryId) : categoryId;

      const result = await SpecificationModel.find({
        categoryId: id,
        isDeleted: { $ne: true }
      });

      console.log(`Found ${result.length} specifications`);
      return result;
    } catch (error) {
      console.error(`Error getting specifications for categoryId ${categoryId}:`, error);
      throw new Error(`Error retrieving specifications: ${error}`);
    }
  }

  /**
   * Get specification by ID
   */
  async getSpecificationById(id: string) {
    try {
      return await SpecificationModel.findById(id);
    } catch (error) {
      throw new Error(`Error retrieving specification by ID: ${error}`);
    }
  }

  /**
   * Soft delete specification
   */
  async softDeleteSpecification(id: string) {
    try {
      return await SpecificationModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error soft deleting specification: ${error}`);
    }
  }

  /**
   * Hard delete specification
   */
  async hardDeleteSpecification(id: string) {
    try {
      return await SpecificationModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error hard deleting specification: ${error}`);
    }
  }

  /**
   * Update specification
   */
  async updateSpecification(id: string, data: any) {
    try {
      return await SpecificationModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating specification: ${error}`);
    }
  }
}
