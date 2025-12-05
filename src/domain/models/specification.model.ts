import mongoose, { Schema } from "mongoose";

// Check current collection name to ensure consistency
const currentCollectionName = 'specifications'; // or 'productSpecifications' depending on what's in your DB

const SpecificationItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    checkedFilter: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { _id: true });

const SpecificationSchema = new Schema(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        groupName: {
            type: String,
            required: true
        },
        specifications: [SpecificationItemSchema],
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        collection: currentCollectionName // Explicitly set the collection name
    }
);

// Prevent model redefinition error
const SpecificationModel = mongoose.models.Specification ||
    mongoose.model("Specification", SpecificationSchema);

export default SpecificationModel;