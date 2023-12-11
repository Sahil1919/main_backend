import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";
import ApiSuccess from "../utils/ApiSuccess.js";

const registerUser = asyncHandler(async (req, res) => {

    console.log("BOdy request ", req.body);
    const { fullname, username, email, password } = req.body

    if ([fullname, username, email, password].some((field) => (field?.trim() === ''))) {
        throw new ApiError(400, "Al fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username, email }]
    })

    if (existedUser) throw new ApiError(409,"User Already Exists !!!")

    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) throw new ApiError(400,"Avatar Image is required")

    let coverImageLocalPath 
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if (!avatar) throw new ApiError(400,"Avatar Image is required")

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ''
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) throw new ApiError (500, "Something Went Wrong while Creating a User !!!")
    
    res.status(201).json(
        new ApiSuccess(200,createdUser,"User Registered Successfully !!!")
    )
    console.log("User Added Successfully !!!");
})

export  {registerUser}