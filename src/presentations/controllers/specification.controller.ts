import { Request, Response } from "express";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { SpecificationService } from "../../services/specification.service";

export const SpecificationController = {
  createSpecification: async (req: Request, res: Response) => {
    const { categoryId, type } = req.body;
    const newSpecificationOfProduct =
      await SpecificationService.createSpecification(categoryId, type);
    res.json(
      successResponse(
        HttpStatus.CREATED,
        "Specification of product created successfully",
        newSpecificationOfProduct
      )
    );
  },
  getSpecificationByCategoryId: async (req: Request, res: Response) => {
    try {
      const { categoryId } = req.params;
      console.log("Controller getting specifications for categoryId:", categoryId);

      const data = await SpecificationService.getSpecificationByCategoryId(
        categoryId
      );

      console.log(`Controller received ${data.length} specifications`);

      // Check if data exists and has the expected structure
      if (!data || data.length === 0) {
        return res.json(
          successResponse(HttpStatus.OK, "No specifications found", { categoryId, type: [] })
        );
      }

      // Transform the data to ensure consistent format
      const mapFormatData = {
        categoryId: data[0]?.categoryId,
        type: data.map((item) => ({
          groupName: item.groupName,
          specifications: (item.specifications || []).map((spec: { name: any; _id: any; checkedFilter: any; }) => ({
            name: spec.name,
            id: spec._id,
            checkedFilter: spec.checkedFilter,
          })),
        })),
      };

      return res.json(
        successResponse(HttpStatus.OK, "Get data success", mapFormatData)
      );
    } catch (error) {
      console.error("Error in getSpecificationByCategoryId controller:", error);
      return res.status(500).json({
        statusCode: 500,
        message: "Error retrieving specifications",
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        ok: false
      });
    }
  },

  getSpecificationByCategoryUrl: async (req: Request, res: Response) => {
    const { categoryUrl } = req.params;
    const data = await SpecificationService.getSpecificationFilterByCategoryUrl(
      categoryUrl
    );

    return res.json(successResponse(HttpStatus.OK, "Get data success", data));
  },

  updateSpecification: async (req: Request, res: Response) => {
    const { id } = req.params;
    const dataUpdate = await SpecificationService.updateSpecification(
      id,
      req.body
    );
    return res.json(
      successResponse(HttpStatus.OK, "Update data success", dataUpdate)
    );
  },

  deleteSpecificationById: async (req: Request, res: Response) => {
    const { id } = req.params;
    await SpecificationService.softDeleteSpecificationById(id);
    return res.json(
      successResponse(HttpStatus.OK, "Specification soft deleted successfully", null)
    );
  },

  hardDeleteSpecificationById: async (req: Request, res: Response) => {
    const { id } = req.params;
    await SpecificationService.hardDeleteSpecificationById(id);
    return res.json(
      successResponse(HttpStatus.OK, "Specification permanently deleted successfully", null)
    );
  },
};
