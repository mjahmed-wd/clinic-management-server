import mongoose from "mongoose";

interface IDropDown{
    value: string;
    label: string;
}

const dropdownShema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
  });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: dropdownShema,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dzqbzqgjw/image/upload/v1599098981/default_profile_pic_qjqjqj.png"
    },
    info: {
        type: Object,
    }

});

const User = mongoose.model("User", userSchema);

export { User };