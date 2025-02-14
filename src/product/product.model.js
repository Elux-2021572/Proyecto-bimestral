import { Schema, model } from "mongoose";

const userSchema = Schema({
    nameProduct:{
        type: String,
        required: [true, "Name product is required"],
        maxLength: [60, "Name product cannot exceed 60 characters"],
        unique: true
    },
    descriptionProduct:{
        type: String,
        required: [true, "Description product is required"],
        maxLength: [200, "Description product cannot exceed 200 characters"]
    },
    priceProduct:{
        type: Number,
        required: [true, "Price is required"],
    },
    stock:{
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
        min: [0, "Sold cannot be negative"],
      },  
    categoryProduct:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    imageProduct:{
        type:String
    },
    status: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true,
    versionKey: false
})

export default model("Product", productSchema)