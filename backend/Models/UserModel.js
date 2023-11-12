import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Please add an userName"],
            unique: true,
            trim: true,
        },
        fullName:  {
            type: String,
            required: [true, "Please add a full name"],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be at least 6 characters"],
        },
        image: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        dob: {
            type: Date,
            default: "",
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("User", UserSchema);  