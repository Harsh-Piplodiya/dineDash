import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Food } from '../models/food.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const addFoodItem = asyncHandler(async (req, res) => {
    // let img_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;
    
    const imgLocalPath = req.file?.path;
    // console.log(imgLocalPath);
    
    if(!imgLocalPath) {
        throw new ApiError(400, "Image file is required!");
    }

    const img = await uploadOnCloudinary(imgLocalPath);

    if(!img) {
        throw new ApiError(400, "Image file is required!");
    }

    
    const food = new Food({
        name,
        description,
        price,
        category,
        image: img.url
    });

    try {
        await food.save();
        return res.status(201).json(new ApiResponse(201, addFoodItem, "Food item added successfully!"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})

const listFoodItems = asyncHandler(async (req, res) => {
    try {
        const foods = await Food.find({});
        return res.status(201).json(new ApiResponse(201, foods, "List fetched successfully!"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})

const removeFoodItems = asyncHandler(async (req, res) => {
    try {
        // const food = await Food.findById(req.body.id);
        // console.log(food);
        // console.log(food.image);
        // await deleteFromCloudinary(food.image);
        await Food.findByIdAndDelete(req.body.id);
        return res.status(201).json(new ApiResponse(201, removeFoodItems, "Food Item removed from database successfully!"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
})

export { 
    addFoodItem, 
    listFoodItems,
    removeFoodItems
};