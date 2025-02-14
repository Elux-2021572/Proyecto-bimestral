import { Schema, model } from "mongoose";

const categorySchema = Schema({
    categoryName:{
        type: String,
        required: [true, "Category name is required"],
        maxLength: [50, "Category name cannot exceed 50 characters"],
        unique: true
    },
    categoryDescription:{
        type:String,
        maxLength: [200, "Description cannot exceed 200 characters"],
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Category', categorySchema);